/*
 * space-patrol.js — drop-in ASCII space shooter component
 *
 * Usage: add <div class="space-patrol">Your text here</div> to any page,
 *        then include this script. React loads automatically.
 *
 * The collapsed state uses .disclaimer CSS classes for consistent styling.
 * Supports both dark and light themes via data-theme attribute.
 */
(function () {
    var containers = document.querySelectorAll('.space-patrol');
    if (!containers.length) return;

    /* inject critical CSS immediately to prevent FOUT and fix margin */
    var critStyle = document.createElement('style');
    critStyle.textContent = '.space-patrol{visibility:hidden;margin-bottom:0!important}.space-patrol.sp-ready{visibility:visible}.space-patrol .disclaimer{margin-bottom:0!important}';
    document.head.appendChild(critStyle);

    function loadScript(src, cb) {
        var s = document.createElement('script');
        s.src = src;
        s.onload = cb;
        document.head.appendChild(s);
    }

    function boot() {
        if (typeof React === 'undefined') {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js', function () {
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js', init);
            });
        } else {
            init();
        }
    }

    function init() {
        containers.forEach(function (el) {
            var customText = el.textContent.trim();
            el.textContent = '';
            var wrapper = document.createElement('div');
            el.appendChild(wrapper);
            ReactDOM.createRoot(wrapper).render(React.createElement(App, { text: customText }));
            el.classList.add('sp-ready');
        });
    }

    function getTheme() {
        return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    var THEMES = {
        dark: {
            bg: "radial-gradient(ellipse at 30% 50%, #0d0d1a 0%, #060610 50%, #020208 100%)",
            border: "rgba(255,107,53,0.4)",
            starColor: function(o){ return "rgba(180,180,210,"+o+")"; },
            accent: "#FF6B35",
            accentGlow: "rgba(255,107,53,",
            ship: "#FF6B35",
            shipGlow: "0 0 8px rgba(255,107,53,0.6), 0 0 20px rgba(255,107,53,0.2)",
            exhaust: "#ff8833",
            exhaustGlow: "0 0 10px rgba(255,136,51,0.7)",
            laser: "#ffdd00",
            laserGlow: "0 0 8px rgba(255,221,0,0.9), 0 0 25px rgba(255,221,0,0.4)",
            heartOn: "#FF6B35",
            heartOff: "#3a2a1a",
            heartGlow: "0 0 8px rgba(255,107,53,0.6)",
            meteorBase: [170,119,85],
            meteorHit: [255,69,30],
            explColors: ["#ffcc33","#ffaa33","#ff8833","#aa6633","#664422"],
            explGlow: "0 0 15px rgba(255,170,51,0.9), 0 0 30px rgba(255,130,30,0.5)",
            titleColor: "#FF6B35",
            titleGlow: "0 0 15px rgba(255,107,53,0.4), 0 0 40px rgba(255,107,53,0.15)",
            deathColor: "#ff3333",
            deathGlow: "0 0 12px rgba(255,51,51,0.5), 0 0 30px rgba(255,30,30,0.2)",
            deathAccent: "#ff5544",
            deathMid: "#aa4433",
            deathDim: "#773322",
            hudShadow: "0 0 6px rgba(255,107,53,0.3)",
            subtextA: "rgba(180,180,210,0.4)",
            subtextB: "rgba(180,180,210,0.25)",
            btnColor: "rgba(255,107,53,0.6)",
            btnBorder: "rgba(255,107,53,0.25)",
            idleBg: "radial-gradient(ellipse at center, rgba(10,10,26,0.3) 0%, rgba(2,2,8,0.8) 100%)",
            deathBg: "radial-gradient(ellipse at center, rgba(30,5,5,0.7) 0%, rgba(2,2,8,0.9) 100%)",
            deathBtnColor: "rgba(255,85,68,0.6)",
            deathBtnBorder: "rgba(255,85,68,0.25)",
            insetShadow: "inset 0 0 120px rgba(0,0,0,0.5)",
            shipExplColors: ["#FF6B35","#ffaa33","#ffcc33","#ff8833","#aa6633","#664422","#443322"]
        },
        light: {
            bg: "radial-gradient(ellipse at 30% 50%, #e0e0f0 0%, #d0d0e2 50%, #c5c5da 100%)",
            border: "rgba(124,58,237,0.4)",
            starColor: function(o){ return "rgba(60,50,90,"+Math.min(o*0.9,0.6)+")"; },
            accent: "#7C3AED",
            accentGlow: "rgba(124,58,237,",
            ship: "#7C3AED",
            shipGlow: "0 0 8px rgba(124,58,237,0.5), 0 0 20px rgba(124,58,237,0.15)",
            exhaust: "#9b6dff",
            exhaustGlow: "0 0 10px rgba(124,58,237,0.5)",
            laser: "#a855f7",
            laserGlow: "0 0 8px rgba(168,85,247,0.8), 0 0 25px rgba(124,58,237,0.35)",
            heartOn: "#7C3AED",
            heartOff: "#c0b8d0",
            heartGlow: "0 0 6px rgba(124,58,237,0.5)",
            meteorBase: [120,90,70],
            meteorHit: [200,50,20],
            explColors: ["#c084fc","#a855f7","#9333ea","#7e22ce","#6b21a8"],
            explGlow: "0 0 12px rgba(168,85,247,0.7), 0 0 25px rgba(124,58,237,0.4)",
            titleColor: "#7C3AED",
            titleGlow: "0 0 12px rgba(124,58,237,0.3), 0 0 30px rgba(124,58,237,0.1)",
            deathColor: "#b91c1c",
            deathGlow: "0 0 10px rgba(185,28,28,0.4), 0 0 25px rgba(185,28,28,0.2)",
            deathAccent: "#7C3AED",
            deathMid: "#6D28D9",
            deathDim: "#8b7ab8",
            hudShadow: "0 0 4px rgba(124,58,237,0.25)",
            subtextA: "rgba(60,50,90,0.45)",
            subtextB: "rgba(60,50,90,0.3)",
            btnColor: "rgba(124,58,237,0.6)",
            btnBorder: "rgba(124,58,237,0.3)",
            idleBg: "radial-gradient(ellipse at center, rgba(224,224,240,0.4) 0%, rgba(197,197,218,0.85) 100%)",
            deathBg: "radial-gradient(ellipse at center, rgba(234,234,240,0.95) 0%, rgba(210,210,225,0.97) 100%)",
            deathBtnColor: "rgba(124,58,237,0.6)",
            deathBtnBorder: "rgba(124,58,237,0.3)",
            insetShadow: "inset 0 0 80px rgba(100,90,140,0.08)",
            shipExplColors: ["#7C3AED","#a855f7","#c084fc","#9b6dff","#8b7ab8","#a099b8","#c0b8d0"]
        }
    };

    /* ── constants ── */
    var GW=800,GH=500,SX=50,LS=14,SC=200,FR=133;

    var SHIP=["     \u2571\u2583","   \u2571\u2550\u2550\u2583","\u22A2\u2588\u2588\u2588\u2588\u2588\u2588\u25B8\u25B8\u25B8","   \u2572\u2550\u2550\u2583","     \u2572\u2583"];

    var MT=[
      {art:["  .:."," (ite)","  '\u00B7'"],w:6,h:3,sp:[2.5,4.5],pt:10,hp:1},
      {art:["   .\u00B7:\u00B7.","  (ite  )"," ( rock  )","  (  ite)","   '\u00B7:\u00B7'"],w:11,h:5,sp:[1.5,3],pt:25,hp:2},
      {art:["    ___..._","  .\u00B4rite   `.","  / meteorite \\","| of great   |"," \\ enormity  /","  `._rite_.\u00B4","    \u00AF\u00AF\u00AF\u00B7\u00B7\u00B7\u00AF"],w:15,h:7,sp:[0.8,2],pt:50,hp:4},
      {art:["      __.\u00B7\u00B7\u00B7.__","   .\u00B4 meteorite`.","  / of dangerous \\"," | and tremendous  |"," |  proportions    |"," |  approaching    |","  \\ at velocity   /","   `._ rapidly _.\u00B4","      \u00AF\u00AF\u00AF\u00B7\u00B7\u00B7\u00AF\u00AF\u00AF"],w:20,h:9,sp:[0.5,1.5],pt:100,hp:7}
    ];

    var EF=[
      [" \\|/ ","- \u2731 -"," /|\\ "],
      ["\u00B7\\|/\u00B7","- \u2734 -","\u00B7/|\\\u00B7"],
      [" .*. ",".*\u2727*.","  .*. "],
      ["  . "," \u00B7 \u00B7 ","  .  "],
      ["     ","  \u00B7  ","     "]
    ];

    var SEF=[
      {art:["  \\|/ "," -\u22A2\u2588\u2588\u25B8-","  /|\\ "],ci:0,glow:true},
      {art:[" \u00B7\\|/\u00B7 ","\u00B7- \u2731\u2731 -\u00B7"," \u00B7/|\\\u00B7 "],ci:1,glow:true},
      {art:["  .\u2734. "," .\u2734\u2727\u2734. ","  .\u2734.  "],ci:2,glow:true},
      {art:[" \u00B7 * \u00B7 ","\u00B7 * * \u00B7"," \u00B7 * \u00B7 "],ci:3,glow:true},
      {art:["  .*. "," .\u00B7*\u00B7. ","  .*.  "],ci:4,glow:false},
      {art:["   \u00B7  ","  \u00B7 \u00B7 ","   \u00B7  "],ci:5,glow:false},
      {art:["      ","   \u00B7  ","      "],ci:6,glow:false}
    ];

    var STARS=[".","\u00B7","\u2219","\u22C5","\u00B0","\u2218","\u2726","\u2727","+","*","\u22B9","\u207A","\u02DA","\u2022"];

    function mkStars(){return Array.from({length:SC},function(){return{x:Math.random()*GW,y:Math.random()*GH,c:STARS[Math.random()*STARS.length|0],s:0.1+Math.random()*1.2,o:0.1+Math.random()*0.7,sz:7+Math.random()*7};});}

    var ce=function(){return React.createElement.apply(null,arguments);};

    /* ── useTheme hook ── */
    function useTheme(){
      var _t=React.useState(getTheme()),theme=_t[0],setTheme=_t[1];
      React.useEffect(function(){
        var obs=new MutationObserver(function(){setTheme(getTheme());});
        obs.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
        return function(){obs.disconnect();};
      },[]);
      return THEMES[theme];
    }

    /* ── Game component ── */
    function Game(){
      var h=React.useState,r=React.useRef,uc=React.useCallback,ue=React.useEffect;
      var T=useTheme();
      var _gs=h("idle"),gs=_gs[0],setGs=_gs[1];
      var _sy=h(GH/2),sy=_sy[0],setSy=_sy[1];
      var _las=h([]),las=_las[0],setLas=_las[1];
      var _mets=h([]),mets=_mets[0],setMets=_mets[1];
      var _exps=h([]),exps=_exps[0],setExps=_exps[1];
      var _stars=h(mkStars),stars=_stars[0],setStars=_stars[1];
      var _hp=h(3),hp=_hp[0],setHp=_hp[1];
      var _sc=h(0),sc=_sc[0],setSc=_sc[1];
      var _lv=h(1),lv=_lv[0],setLv=_lv[1];
      var _hi=h(0),hi=_hi[0],setHi=_hi[1];
      var _ex=h(0),ex=_ex[0],setEx=_ex[1];
      var _se=h(false),se=_se[0],setSe=_se[1];
      var _sef=h(0),sef=_sef[0],setSef=_sef[1];
      var _dsy=h(GH/2),dsy=_dsy[0],setDsy=_dsy[1];

      var gR=r(null),aR=r(null),lm=r(0);
      var gsR=r(gs),syR=r(sy),lasR=r(las),metsR=r(mets);
      var hpR=r(hp),scR=r(sc),lvR=r(lv),dcR=r(0);
      var fI=r(null),iF=r(false),seR=r(false);

      ue(function(){gsR.current=gs;},[gs]);
      ue(function(){syR.current=sy;},[sy]);
      ue(function(){lasR.current=las;},[las]);
      ue(function(){metsR.current=mets;},[mets]);
      ue(function(){hpR.current=hp;},[hp]);
      ue(function(){scR.current=sc;},[sc]);
      ue(function(){lvR.current=lv;},[lv]);
      ue(function(){seR.current=se;},[se]);

      var fire=uc(function(){
        if(gsR.current!=="playing"||seR.current)return;
        setLas(function(p){return p.concat([{x:SX+90,y:syR.current,id:Date.now()+Math.random()}]);});
      },[]);
      var startF=uc(function(){if(iF.current)return;iF.current=true;fire();fI.current=setInterval(fire,FR);},[fire]);
      var stopF=uc(function(){iF.current=false;if(fI.current){clearInterval(fI.current);fI.current=null;}},[]);
      ue(function(){return function(){stopF();};},[stopF]);

      var spawn=uc(function(){
        var l=lvR.current,mx=Math.min(MT.length,1+Math.floor(l/2)),ti=Math.random()*mx|0,t=MT[ti];
        var sp=t.sp[0]+Math.random()*(t.sp[1]-t.sp[0])+l*0.2,ss=1+(l-1)*0.06;
        return{x:GW+20,y:40+Math.random()*(GH-100),type:ti,speed:sp,sizeScale:ss,hp:t.hp,rot:Math.random()*0.2-0.1,id:Date.now()+Math.random(),passed:false};
      },[]);

      var start=uc(function(){setGs("playing");setHp(3);setSc(0);setLv(1);setLas([]);setMets([]);setExps([]);setStars(mkStars());setSe(false);setSef(0);lm.current=0;dcR.current=0;},[]);

      var trigSE=uc(function(){stopF();setSe(true);setDsy(syR.current);setSef(0);},[stopF]);

      var dmg=uc(function(){
        if(dcR.current>0||seR.current)return;
        dcR.current=30;
        setHp(function(p){var n=p-1;if(n<=0){trigSE();setHi(function(h){return Math.max(h,scR.current);});}return Math.max(0,n);});
      },[trigSE]);

      var loop=uc(function(){
        if(gsR.current!=="playing")return;
        setEx(function(p){return p+1;});
        if(dcR.current>0)dcR.current--;

        if(seR.current){setSef(function(p){var n=p+0.08;if(n>=SEF.length){setSe(false);setGs("gameover");return 0;}return n;});}

        setStars(function(p){return p.map(function(s){var o={x:s.x-s.s,y:s.y,c:s.c,s:s.s,o:s.o,sz:s.sz};if(o.x<-10){o.x=GW+10;o.y=Math.random()*GH;}return o;});});
        setLas(function(p){return p.map(function(l){return{x:l.x+LS,y:l.y,id:l.id};}).filter(function(l){return l.x<GW+20;});});

        if(!seR.current){var l=lvR.current,sr=Math.max(400,1800-l*130),n=Date.now();if(n-lm.current>sr){setMets(function(p){return p.concat([spawn()]);});lm.current=n;}}

        setMets(function(p){return p.map(function(m){return Object.assign({},m,{x:m.x-m.speed});});});
        setExps(function(p){return p.map(function(x){return Object.assign({},x,{frame:x.frame+0.12});}).filter(function(x){return x.frame<EF.length;});});

        var cL=lasR.current.map(function(l){return{x:l.x+LS,y:l.y,id:l.id};});
        var cM=metsR.current.map(function(m){return Object.assign({},m,{x:m.x-m.speed});});
        var cy=syR.current;

        var hL=new Set(),dM=new Set(),dg={},nE=[],aS=0;
        cL.forEach(function(l,li){cM.forEach(function(m,mi){
          if(dM.has(mi)||hL.has(li))return;
          var t=MT[m.type],s=m.sizeScale||1,mw=t.w*8*s,mh=t.h*14*s;
          if(l.x+40>m.x&&l.x<m.x+mw&&l.y>m.y-mh/2&&l.y<m.y+mh/2){
            hL.add(li);var ch=dg[mi]!==undefined?dg[mi]:m.hp,nh=ch-1;
            if(nh<=0){dM.add(mi);aS+=t.pt;nE.push({x:m.x+mw/2,y:m.y,frame:0,id:Math.random()});}else{dg[mi]=nh;}
          }
        });});

        if(hL.size||dM.size||Object.keys(dg).length){
          setLas(function(p){return p.map(function(l){return{x:l.x+LS,y:l.y,id:l.id};}).filter(function(_,i){return!hL.has(i);});});
          setMets(function(p){return p.map(function(m,i){if(dM.has(i))return null;var u=Object.assign({},m,{x:m.x-m.speed});if(dg[i]!==undefined)u.hp=dg[i];return u;}).filter(Boolean);});
          if(nE.length)setExps(function(p){return p.concat(nE);});
          if(aS)setSc(function(p){var ns=p+aS,nl=1+Math.floor(ns/100);if(nl>lvR.current)setLv(nl);return ns;});
        }

        if(!seR.current){
          var cC=new Set();
          cM.forEach(function(m,mi){if(dM.has(mi))return;var t=MT[m.type],s=m.sizeScale||1,mw=t.w*8*s,mh=t.h*14*s;
            if(m.x<SX+90&&m.x+mw>SX&&m.y-mh/2<cy+28&&m.y+mh/2>cy-28)cC.add(mi);});
          if(cC.size){dmg();setMets(function(p){return p.filter(function(_,i){return!cC.has(i);});});}

          setMets(function(p){var pd=false;var u=p.map(function(m){var t=MT[m.type],s=m.sizeScale||1,mw=t.w*8*s;
            if(!m.passed&&m.x+mw<SX){if(!pd)pd=true;return Object.assign({},m,{passed:true});}return m;});if(pd)dmg();return u;});
        }

        setMets(function(p){return p.filter(function(m){return m.x>-200;});});
        aR.current=requestAnimationFrame(loop);
      },[spawn,dmg]);

      ue(function(){if(gs==="playing")aR.current=requestAnimationFrame(loop);return function(){if(aR.current)cancelAnimationFrame(aR.current);};},[gs,loop]);

      var onMM=uc(function(ev){if(gsR.current!=="playing"||seR.current||!gR.current)return;var rect=gR.current.getBoundingClientRect();setSy(Math.max(35,Math.min(GH-35,ev.clientY-rect.top)));},[]);
      var onMD=uc(function(ev){ev.preventDefault();if(gsR.current==="idle"||gsR.current==="gameover"){start();return;}if(gsR.current==="playing"&&!seR.current)startF();},[start,startF]);
      var onMU=uc(function(){stopF();},[stopF]);
      var onML=uc(function(){stopF();},[stopF]);

      var exC=["~\u2248~","\u2248~\u2248","~\u223C~"];
      var mono="'Courier New', Courier, monospace";

      return ce("div",{style:{fontFamily:mono}},
        ce("div",{ref:gR,onMouseDown:onMD,onMouseUp:onMU,onMouseLeave:onML,onMouseMove:onMM,
          style:{width:GW,maxWidth:"100%",height:GH,background:T.bg,border:"1px solid "+T.border,borderRadius:4,position:"relative",overflow:"hidden",cursor:gs==="playing"&&!se?"crosshair":"pointer",userSelect:"none",boxShadow:T.insetShadow}},

          /* stars */
          stars.map(function(s,i){return ce("span",{key:i,style:{position:"absolute",left:s.x,top:s.y,color:T.starColor(s.o),fontSize:s.sz,pointerEvents:"none",lineHeight:1}},s.c);}),

          gs==="playing"&&[
            /* HUD */
            ce("div",{key:"hud-hp",style:{position:"absolute",top:10,left:14,display:"flex",gap:8,zIndex:10}},
              [0,1,2].map(function(i){return ce("span",{key:i,style:{color:i<hp?T.heartOn:T.heartOff,fontSize:14,fontFamily:mono,textShadow:i<hp?T.heartGlow:"none"}},i<hp?"<3":"<"+"/3");})),
            ce("div",{key:"hud-sc",style:{position:"absolute",top:10,left:"50%",transform:"translateX(-50%)",color:T.accent,fontSize:13,letterSpacing:3,zIndex:10,textShadow:T.hudShadow}},"SCORE "+String(sc).padStart(6,"0")),
            ce("div",{key:"hud-lv",style:{position:"absolute",top:10,right:14,color:T.accent,fontSize:13,letterSpacing:2,zIndex:10,textShadow:T.hudShadow}},"LVL "+lv),

            /* exhaust + ship */
            !se&&ce("div",{key:"exhaust",style:{position:"absolute",left:SX-22,top:sy-5,color:T.exhaust,fontSize:11,whiteSpace:"pre",zIndex:4,textShadow:T.exhaustGlow,opacity:0.5+Math.sin(ex*0.5)*0.3}},exC[ex%exC.length]),
            !se&&ce("div",{key:"ship",style:{position:"absolute",left:SX,top:sy-30,color:T.ship,fontSize:13,lineHeight:"13px",whiteSpace:"pre",zIndex:5,textShadow:T.shipGlow}},SHIP.join("\n")),

            /* ship explosion */
            se&&(function(){var fi=Math.min(Math.floor(sef),SEF.length-1),f=SEF[fi],col=T.shipExplColors[fi]||T.shipExplColors[T.shipExplColors.length-1];
              return ce("div",{key:"shipexp",style:{position:"absolute",left:SX+20,top:dsy-20,color:col,fontSize:15,lineHeight:"15px",whiteSpace:"pre",zIndex:6,textShadow:f.glow?"0 0 15px "+col+", 0 0 30px "+col+"66":"none",opacity:1-sef/SEF.length*0.3,transform:"scale("+(1+sef*0.15)+")"}},f.art.join("\n"));})(),

            /* lasers */
            las.map(function(l){return ce("div",{key:l.id,style:{position:"absolute",left:l.x,top:l.y-4,color:T.laser,fontSize:12,fontWeight:"bold",whiteSpace:"pre",zIndex:4,letterSpacing:-1,textShadow:T.laserGlow}},"\u2500\u2500\u2500\u2500\u2500\u2500");}),

            /* meteors */
            mets.map(function(m){var t=MT[m.type],s=m.sizeScale||1,hr=m.hp/t.hp;
              var rb=T.meteorBase,rh=T.meteorHit;
              var r=rb[0]+(1-hr)*(rh[0]-rb[0])|0,g=rb[1]+(1-hr)*(rh[1]-rb[1])|0,b=rb[2]+(1-hr)*(rh[2]-rb[2])|0;
              return ce("div",{key:m.id,style:{position:"absolute",left:m.x,top:m.y-(t.h*14*s)/2,color:"rgb("+r+","+g+","+b+")",fontSize:12*s,lineHeight:14*s+"px",whiteSpace:"pre",zIndex:3,textShadow:"0 0 6px rgba("+r+","+g+","+b+",0.5)",transform:"rotate("+m.rot+"rad)"}},t.art.join("\n"));}),

            /* explosions */
            exps.map(function(x){var fi=Math.min(Math.floor(x.frame),EF.length-1);
              return ce("div",{key:x.id,style:{position:"absolute",left:x.x-20,top:x.y-20,color:T.explColors[fi],fontSize:14,lineHeight:"14px",whiteSpace:"pre",zIndex:6,textShadow:fi<2?T.explGlow:"none",opacity:1-x.frame/EF.length,transform:"scale("+(1+x.frame*0.3)+")"}},EF[fi].join("\n"));})
          ],

          /* idle screen */
          gs==="idle"&&ce("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:20,background:T.idleBg}},
            ce("pre",{style:{color:T.titleColor,fontSize:10,lineHeight:"12px",letterSpacing:1,textShadow:T.titleGlow,marginBottom:24,textAlign:"center",fontFamily:mono}},
"  ____  ____   __    ___  ____\n / ___)(  _ \\ / _\\  / __)(  __)\n \\___ \\ ) __//    \\( (__  ) _)\n (____/(__)  \\_/\\_/ \\___)(____)\n ____   __  ____  ____  _____  __\n(  _ \\ / _\\(_  _)(  _ \\(  _  )(  )\n ) __//    \\ )(   )   / )(_)(  )(__\n(__)  \\_/\\_/(__) (_)\\_)(_____)(____)"),
            ce("div",{style:{color:T.subtextA,fontSize:12,marginBottom:6,letterSpacing:3}},"mouse to move \u00B7 hold to fire"),
            ce("div",{style:{color:T.subtextB,fontSize:11,marginBottom:24,letterSpacing:2}},"destroy meteors \u00B7 survive the void"),
            ce("div",{style:{color:T.btnColor,fontSize:13,cursor:"pointer",padding:"6px 20px",border:"1px solid "+T.btnBorder,borderRadius:3,letterSpacing:4}},"[ LAUNCH ]")),

          /* game over screen */
          gs==="gameover"&&ce("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:20,background:T.deathBg}},
            ce("pre",{style:{color:T.deathColor,fontSize:10,lineHeight:"12px",letterSpacing:1,textShadow:T.deathGlow,marginBottom:20,textAlign:"center",fontFamily:mono}},
"\n ____  ____  ____  ____  ____  _____  _  _  ____  ____\n(  _ \\( ___)/ ___)(_  _)(  _ \\(  _  )( \\/ )( ___)(  _ \\\n )(_) ))__)  \\___ \\  )(   )   / )(_)(  \\  /  )__)  )(_) )\n(____/(____)(____/ (__) (_)\\_)(_____) (__) (____)(____/"),
            ce("div",{style:{color:T.deathAccent,fontSize:14,letterSpacing:3,marginBottom:6,textShadow:"0 0 8px "+T.deathAccent+"66"}},"SCORE "+String(sc).padStart(6,"0")),
            ce("div",{style:{color:T.deathMid,fontSize:12,letterSpacing:2,marginBottom:4}},"LVL "+lv),
            ce("div",{style:{color:T.deathDim,fontSize:11,letterSpacing:2,marginBottom:24}},"BEST "+String(Math.max(hi,sc)).padStart(6,"0")),
            ce("div",{style:{color:T.deathBtnColor,fontSize:13,cursor:"pointer",padding:"6px 20px",border:"1px solid "+T.deathBtnBorder,borderRadius:3,letterSpacing:4}},"[ RELAUNCH ]"))
        )
      );
    }

    /* ── App wrapper: disclaimer box → game ── */
    function App(props){
      var label = props.text || "Space Patrol \u2014 click to play";
      var _o=React.useState(false),open=_o[0],setOpen=_o[1];

      if(!open){
        return ce("div",{className:"disclaimer",onClick:function(){setOpen(true);},style:{cursor:"pointer"}},
          ce("svg",{className:"disclaimer-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},
            ce("polygon",{points:"12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"})),
          ce("p",null,label));
      }

      return ce("div",null,
        ce(Game),
        ce("div",{onClick:function(){setOpen(false);},style:{color:"var(--text-muted)",fontSize:11,marginTop:8,cursor:"pointer",textAlign:"right",opacity:0.5}},"[ close ]"));
    }

    boot();
})();
