(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{44:function(e,t,n){e.exports=n(64)},49:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(35),i=n.n(l),o=(n(49),n(19)),c=n(9),u=n(16),s=r.a.createContext(null),m=n(4),h=n(5),d=n(7),p=n(6),f=n(8),b=r.a.createContext(null),E=function(e){return function(t){return r.a.createElement(b.Consumer,null,function(n){return r.a.createElement(e,Object.assign({},t,{firebase:n}))})}},g=b,v=n(10),O=n(24),C=n.n(O),S=(n(52),n(54),{apiKey:"AIzaSyDVEPVaF1oAiTShFBU0Xz7GX_e9Y-OV8Zk",authDomain:"social-react-elec01.firebaseapp.com",databaseURL:"https://social-react-elec01.firebaseio.com",projectId:"social-react-elec01",storageBucket:"social-react-elec01.appspot.com",messagingSenderId:"578372926394",appId:"578372926394"}),j=function e(){var t=this;Object(m.a)(this,e),this.doCreateUserWithEmailAndPassword=function(e,n){return t.auth.createUserWithEmailAndPassword(e,n)},this.doSignInWithEmailAndPassword=function(e,n){return t.auth.signInWithEmailAndPassword(e,n)},this.doSignOut=function(){return t.auth.signOut()},this.doPasswordReset=function(e){return t.auth.sendPasswordResetEmail(e)},this.doPasswordUpdate=function(e){return t.auth.currentUser.updatePassword(e)},this.doSendEmailVerification=function(){return t.auth.currentUser.sendEmailVerification({url:"http://localhost:3000"})},this.onAuthUserListener=function(e,n){return t.auth.onAuthStateChanged(function(a){a?t.user(a.uid).get().then(function(t){var n=t.data();n.roles||(n.roles={}),a=Object(v.a)({uid:a.uid,email:a.email,emailVerified:a.emailVerified,providerData:a.providerData},n),e(a)}):n()})},this.user=function(e){return t.db.doc("users/".concat(e))},this.users=function(){return t.db.collection("users")},this.message=function(e){return t.db.doc("messages/".concat(e))},this.messages=function(){return t.db.collection("messages")},C.a.initializeApp(S),this.fieldValue=C.a.firestore.FieldValue,this.auth=C.a.auth(),this.db=C.a.firestore()},w=function(e){var t=function(t){function n(e){var t;return Object(m.a)(this,n),(t=Object(d.a)(this,Object(p.a)(n).call(this,e))).state={authUser:JSON.parse(localStorage.getItem("authUser"))},t}return Object(f.a)(n,t),Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.listener=this.props.firebase.onAuthUserListener(function(t){localStorage.setItem("authUser",JSON.stringify(t)),e.setState({authUser:t})},function(){localStorage.removeItem("authUser"),e.setState({authUser:null})})}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){return r.a.createElement(s.Provider,{value:this.state.authUser},r.a.createElement(e,this.props))}}]),n}(r.a.Component);return E(t)},y=n(12),k="/home",x=function(e){return function(t){var n=function(n){function a(){return Object(m.a)(this,a),Object(d.a)(this,Object(p.a)(a).apply(this,arguments))}return Object(f.a)(a,n),Object(h.a)(a,[{key:"componentDidMount",value:function(){var t=this;this.listener=this.props.firebase.onAuthUserListener(function(n){e(n)||t.props.history.push("/signin")},function(){return t.props.history.push("/signin")})}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){var n=this;return r.a.createElement(s.Consumer,null,function(a){return e(a)?r.a.createElement(t,n.props):null})}}]),a}(r.a.Component);return Object(y.a)(u.f,E)(n)}},D=function(e){var t=function(t){function n(e){var t;return Object(m.a)(this,n),(t=Object(d.a)(this,Object(p.a)(n).call(this,e))).onSendEmailVerification=function(){t.props.firebase.doSendEmailVerification().then(function(){return t.setState({isSent:!0})})},t.state={isSent:!1},t}return Object(f.a)(n,t),Object(h.a)(n,[{key:"render",value:function(){var t=this;return r.a.createElement(s.Consumer,null,function(n){return function(e){return e&&!e.emailVerified&&e.providerData.map(function(e){return e.providerId}).includes("password")}(n)?r.a.createElement("div",null,t.state.isSent?r.a.createElement("p",null,"Se ha enviado un email de confirmaci\xf3n: revisa tus correos incluyendo el Spam. Refresca esta p\xe1gina una vez que hayas confirmado."):r.a.createElement("p",null,"Se ha enviado un email de confirmaci\xf3n: revisa tus correos incluyendo el Spam. Puedes reenviarlo si no lo has recibido."),r.a.createElement("button",{type:"button",onClick:t.onSendEmailVerification,disabled:t.state.isSent},"Enviar email de confirmaci\xf3n")):r.a.createElement(e,t.props)})}}]),n}(r.a.Component);return E(t)},I=function(e){return r.a.createElement("button",{className:"Button Button-primary ".concat(e.extraClassName?e.extraClassName:""),onClick:e.action},e.name)},U=E(function(e){var t=e.firebase;return r.a.createElement(I,{name:"Cerrar Sesi\xf3n",action:t.doSignOut})}),P="ADMIN",A=function(e){var t=e.authUser;return r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(c.b,{to:k},"Home")),r.a.createElement("li",null,r.a.createElement(c.b,{to:"/account"},"Mi Cuenta")),!!t.roles[P]&&r.a.createElement("li",null,r.a.createElement(c.b,{to:"/admin"},"Admin")),r.a.createElement("li",null,r.a.createElement(U,null)))},V=function(){return r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(c.b,{to:"/"},"Bienvenidx")),r.a.createElement("li",null,r.a.createElement(c.b,{to:"/signin"},"Iniciar Sesi\xf3n")),r.a.createElement("li",null,r.a.createElement(c.b,{to:"/signup"},"Crear Cuenta")))},N=function(){return r.a.createElement(s.Consumer,null,function(e){return e?r.a.createElement(A,{authUser:e}):r.a.createElement(V,null)})},R=n(14),W=n(20);function M(){var e=Object(o.a)(["\n  display: flex;\n  max-width: 20rem;\n  padding: 0.5rem;\n  "," > * {\n    flex: 1;\n\n    &:not(:first-child) {\n      ",": 0.5rem;\n    }\n  }\n\n  input {\n    padding: 0.5rem;\n    border-radius: 5px;\n    border: 1px solid #b6b6b6;\n  }\n\n  input::placeholder {\n    color: #ff00cb;\n  }\n\n  button {\n    padding: 0.75rem;\n    border-radius: 0.5rem;\n    border: none;\n  }\n"]);return M=function(){return e},e}var B=W.a.form(M(),function(e){return e.vertical&&"flex-direction: column;"},function(e){return e.vertical?"margin-top":"margin-left"}),F={username:"",email:"",passwordOne:"",passwordTwo:"",isAdmin:!1,error:null},L=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(e){var t=n.state,a=t.username,r=t.email,l=t.passwordOne,i=t.isAdmin,o={};i&&(o[P]=P),n.props.firebase.doCreateUserWithEmailAndPassword(r,l).then(function(e){return n.props.firebase.user(e.user.uid).set({username:a,email:r,roles:o},{merge:!0})}).then(function(){console.log("Document successfully written!")}).catch(function(e){console.error("Error writing document: ",e)}).then(function(){return n.props.firebase.doSendEmailVerification()}).then(function(e){n.setState(Object(v.a)({},F)),n.props.history.push(k)}).catch(function(e){n.setState({error:e})}),e.preventDefault()},n.onChange=function(e){n.setState(Object(R.a)({},e.target.name,e.target.value))},n.onChangeCheckbox=function(e){n.setState(Object(R.a)({},e.target.name,e.target.checked))},n.state=Object(v.a)({},F),n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.state,t=e.username,n=e.email,a=e.passwordOne,l=e.passwordTwo,i=e.isAdmin,o=e.error,c=a!==l||""===a||""===n||""===t;return r.a.createElement(B,{vertical:!0,onSubmit:this.onSubmit,className:"sign-up-form"},r.a.createElement("label",null,"Nombre Completo"),r.a.createElement("input",{name:"username",value:t,onChange:this.onChange,type:"text",placeholder:"Nombre Completo"}),r.a.createElement("label",null,"Email"),r.a.createElement("input",{name:"email",value:n,onChange:this.onChange,type:"text",placeholder:"Email"}),r.a.createElement("label",null,"Contrase\xf1a"),r.a.createElement("input",{name:"passwordOne",value:a,onChange:this.onChange,type:"password",placeholder:"Contrase\xf1a"}),r.a.createElement("label",null,"Confirmar Contrase\xf1a"),r.a.createElement("input",{name:"passwordTwo",value:l,onChange:this.onChange,type:"password",placeholder:"Confirmar Contrase\xf1a"}),r.a.createElement("label",null,"Admin:",r.a.createElement("input",{name:"isAdmin",type:"checkbox",checked:i,onChange:this.onChangeCheckbox})),r.a.createElement("button",{disabled:c,type:"submit"},"Sign Up"),o&&r.a.createElement("p",null,o.message))}}]),t}(a.Component),T=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.b,{to:"/signup"}," Crear una Cuenta "))},H=Object(y.a)(u.f,E)(L),z=function(){return r.a.createElement("div",null,r.a.createElement("h1",null," Registrar Nuevo Usuario "),r.a.createElement(H,null))},J={email:"",error:null},q=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(e){var t=n.state.email;n.props.firebase.doPasswordReset(t).then(function(){n.setState(Object(v.a)({},J))}).catch(function(e){n.setState({error:e})}),e.preventDefault()},n.onChange=function(e){n.setState(Object(R.a)({},e.target.name,e.target.value))},n.state=Object(v.a)({},J),n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,n=e.error,a=""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"email",value:this.state.email,onChange:this.onChange,type:"text",placeholder:"Email"}),r.a.createElement("button",{disabled:a,type:"submit"},"Resetear Contrase\xf1a"),n&&r.a.createElement("p",null," ",n.message," "))}}]),t}(a.Component),Q=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.b,{to:"/pw-forget"}," Olvid\xe9 mi contrase\xf1a")," ")},X=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"PasswordForget"),r.a.createElement(Y,null))},Y=E(q),G={email:"",password:"",error:null},K=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(e){var t=n.state,a=t.email,r=t.password;n.props.firebase.doSignInWithEmailAndPassword(a,r).then(function(){n.setState(Object(v.a)({},G)),n.props.history.push(k)}).catch(function(e){n.setState({error:e})}),e.preventDefault()},n.onChange=function(e){n.setState(Object(R.a)({},e.target.name,e.target.value))},n.state=Object(v.a)({},G),n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,n=e.password,a=e.error,l=""===n||""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("label",null,"Email Registrado"),r.a.createElement("input",{name:"email",value:t,onChange:this.onChange,type:"text",placeholder:"Email"}),r.a.createElement("label",null,"Constrase\xf1a"),r.a.createElement("input",{name:"password",value:n,onChange:this.onChange,type:"password",placeholder:"Contrase\xf1a"}),r.a.createElement("button",{disabled:l,type:"submit"},"Iniciar Sesi\xf3n"),a&&r.a.createElement("p",null,a.message))}}]),t}(a.Component),Z=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.b,{to:"/signin"}," Iniciar Sesi\xf3n "))},$=Object(y.a)(u.f,E)(K),_=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Iniciar Sesi\xf3n"),r.a.createElement($,null),r.a.createElement("p",null,"Quiero ",r.a.createElement(T,null)),r.a.createElement("p",null,r.a.createElement(Q,null)))},ee=function(){return r.a.createElement("div",null,r.a.createElement("h1",null," Landing "),r.a.createElement("h2",null,"Bienvenido a Socialbook, \xbfpor qu\xe9 no ",r.a.createElement(T,null),"?"),r.a.createElement("h2",null,"O puedes ",r.a.createElement(Z,null)),r.a.createElement(I,{name:"A Button",action:function(){console.log("a button"),window.location.href="https://google.com"}}),r.a.createElement(I,{name:"Another Button",action:function(){console.log("another button")},extraClassName:"other-btn"}),r.a.createElement(g.Consumer,null,function(e){return r.a.createElement("div",null,"I ' ve access to Firebase and render something .")}))},te=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={loading:!1,messages:[]},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0}),this.unsubscribe=this.props.firebase.messages().onSnapshot(function(t){var n=[];t.docs.map(function(e){var t={messageID:e.id,messageData:e.data()};return n.push(t),n}),e.setState({messages:n,loading:!1})})}},{key:"componentWillUnmount",value:function(){this.unsubscribe()}},{key:"render",value:function(){var e=this.state,t=e.messages,n=e.loading;return r.a.createElement("div",null,r.a.createElement("h2",null,"messages"),n&&r.a.createElement("div",null,"Loading ..."),r.a.createElement("div",null,console.log(this.state.messages),t.map(function(e){return r.a.createElement("div",{key:e.messageID},r.a.createElement("span",null,r.a.createElement("strong",null,"ID:")," ",e.messageID),r.a.createElement("span",null,r.a.createElement("strong",null,"texto:")," ",e.messageData.text),r.a.createElement("span",null,r.a.createElement("strong",null,"fecha:")," ",e.messageData.createdAt.toDate().toString()),r.a.createElement("span",null))})))}}]),t}(a.Component),ne=E(te),ae=n(21);function re(){var e=Object(o.a)(["\n  max-width: 30%;\n"]);return re=function(){return e},e}var le=W.a.img(re()),ie=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).onChangeText=function(e){n.setState({text:e.target.value}),console.log(n.state.text)},n.onChangeCheckbox=function(e){n.setState({isPublic:e.target.checked}),console.log("Public: "+n.state.isPublic)},n.state={username:"",text:"",images:{file:"",imagePreviewUrl:""},isPublic:!1,error:null,moment:n.getDate()},n.handleImageChange=n.handleImageChange.bind(Object(ae.a)(n)),n.handleImageSubmit=n.handleImageSubmit.bind(Object(ae.a)(n)),n.createPost=n.createPost.bind(Object(ae.a)(n)),n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"getDate",value:function(){var e=new Date;return{date:"".concat(String(e.getDate()).padStart(2,"0"),"/").concat(String(e.getMonth()+1).padStart(2,"0"),"/").concat(e.getFullYear()),time:"".concat(e.getHours(),":").concat(e.getMinutes(),":").concat(e.getSeconds())}}},{key:"handleImageSubmit",value:function(e){e.preventDefault()}},{key:"handleImageChange",value:function(e){var t=this;e.preventDefault();var n=new FileReader,a=e.target.files[0];if(a){var r=a.name.split(".").pop().toLowerCase();["jpg","jpeg","png","gif"].indexOf(r)>-1?(n.onloadend=function(){t.setState({error:null,images:{file:a,imagePreviewUrl:n.result}})},n.readAsDataURL(a)):this.setState({error:"No es un archivo de imagen"})}}},{key:"createPost",value:function(e){this.setState({username:e}),console.log(this.state)}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return r.a.createElement(s.Consumer,null,function(t){return r.a.createElement("div",null,r.a.createElement("h2",null,"Hola, ",t.username),r.a.createElement("h3",null,"Comparte tu \xfaltimo descubrimiento:"),r.a.createElement("input",{type:"text",onChange:e.onChangeText}),r.a.createElement("label",null,"Post privado (visible s\xf3lo en mi club):",r.a.createElement("input",{name:"isPublic",type:"checkbox",checked:e.state.isPublic,value:!1,onChange:e.onChangeCheckbox})),r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.handleImageSubmit},r.a.createElement("input",{type:"file",accept:"image/*",onChange:e.handleImageChange}),r.a.createElement("button",{type:"submit",onClick:e.handleImageSubmit},"Subir Imagen"))),r.a.createElement(le,{src:e.state.images.imagePreviewUrl}),r.a.createElement("div",null,e.state.error),r.a.createElement("button",{type:"submit",onClick:function(){e.createPost(t.username)}},"Publicar"))})}}]),t}(a.Component),oe=E(ie),ce=Object(y.a)(D,x(function(e){return!!e}))(function(){return r.a.createElement("div",null,r.a.createElement("h1",null," Home "),r.a.createElement("p",null,"La p\xe1gina Home est\xe1 visible para todos los usuarios logueados"),r.a.createElement("p",null,"Currently using React ",r.a.version),r.a.createElement(oe,null),r.a.createElement(ne,null))}),ue={passwordOne:"",passwordTwo:"",error:null},se=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).onSubmit=function(e){var t=n.state.passwordOne;n.props.firebase.doPasswordUpdate(t).then(function(){n.setState(Object(v.a)({},ue))}).catch(function(e){n.setState({error:e})}),e.preventDefault()},n.onChange=function(e){n.setState(Object(R.a)({},e.target.name,e.target.value))},n.state=Object(v.a)({},ue),n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.state,t=e.passwordOne,n=e.passwordTwo,a=e.error,l=t!==n||""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"passwordOne",value:t,onChange:this.onChange,type:"password",placeholder:"Nueva contrase\xf1a"}),r.a.createElement("input",{name:"passwordTwo",value:n,onChange:this.onChange,type:"password",placeholder:"Confirmar contrase\xf1a"}),r.a.createElement("button",{disabled:l,type:"submit"},"Cambiar mi Contrase\xf1a"),a&&r.a.createElement("p",null,a.message))}}]),t}(a.Component),me=E(se),he=Object(y.a)(D,x(function(e){return e&&!!e}))(function(){return r.a.createElement(s.Consumer,null,function(e){return r.a.createElement("div",null,r.a.createElement("h1",null," Mi Cuenta "),r.a.createElement("h2",null,"Hola: ",e.username,"!"),r.a.createElement("p",null,r.a.createElement("strong",null,"ID USUARIO:")," ",e.uid),r.a.createElement("div",null,r.a.createElement("h3",null,"Olvid\xe9 mi contrase\xf1a:"),r.a.createElement(Y,null)),r.a.createElement("div",null,r.a.createElement("h3",null,"Quiero cambiar mi contrase\xf1a:"),r.a.createElement(me,null)))})}),de=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).state={loading:!1,users:[]},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0}),this.unsubscribe=this.props.firebase.users().onSnapshot(function(t){var n=[];t.docs.map(function(e){var t={userID:e.id,userData:e.data()};return n.push(t),n}),e.setState({users:n,loading:!1})})}},{key:"componentWillUnmount",value:function(){this.unsubscribe()}},{key:"render",value:function(){var e=this.state,t=e.users,n=e.loading;return r.a.createElement("div",null,r.a.createElement("h2",null,"Users"),n&&r.a.createElement("div",null,"Loading ..."),r.a.createElement("ul",null,t.map(function(e){return r.a.createElement("li",{key:e.userID},r.a.createElement("span",null,r.a.createElement("strong",null,"ID:")," ",e.userID),r.a.createElement("span",null,r.a.createElement("strong",null,"E-Mail:")," ",e.userData.email),r.a.createElement("span",null,r.a.createElement("strong",null,"Username:")," ",e.userData.username),r.a.createElement("span",null))})))}}]),t}(a.Component),pe=E(de),fe=Object(y.a)(D,x(function(e){return e&&!!e.roles[P]}))(function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Admin"),r.a.createElement("p",null,"Esta p\xe1gina es visible a todos los usuarios logueados como administradores."),r.a.createElement(u.c,null,r.a.createElement(u.a,{exact:!0,path:"/admin",component:pe})))});function be(){var e=Object(o.a)(["\n  font-size: 1.5em;\n  text-align: center;\n  color: palevioletred;\n"]);return be=function(){return e},e}var Ee=W.a.h1(be()),ge=w(function(){return r.a.createElement("div",null,r.a.createElement(Ee,null,"App"),r.a.createElement(c.a,null,r.a.createElement("div",null,r.a.createElement(N,null),r.a.createElement("hr",null),r.a.createElement(u.a,{exact:!0,path:"/",component:ee}),r.a.createElement(u.a,{exact:!0,path:"/signup",component:z}),r.a.createElement(u.a,{exact:!0,path:"/signin",component:_}),r.a.createElement(u.a,{exact:!0,path:"/pw-forget",component:X}),r.a.createElement(u.a,{exact:!0,path:k,component:ce}),r.a.createElement(u.a,{exact:!0,path:"/account",component:he}),r.a.createElement(u.a,{exact:!0,path:"/admin",component:fe}))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(g.Provider,{value:new j},r.a.createElement(ge,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[44,1,2]]]);
//# sourceMappingURL=main.0cae42b3.chunk.js.map