if(!_.cartesian){_.cartesian=1;(function($){var UN=function(a,b,c){var d=["whiskerWidth","hoverWhiskerWidth","selectWhiskerWidth"];if(2==c){var e=a.Ca;var f="selected"}else 1==c?(e=a.wa,f="hovered"):(e=a.ba,f="normal");f=b.get(f);b=$.Jo($.n(f)?f[d[0]]:void 0,b.get(d[c]),e.i(d[0]));null!=b||(b=a.ba.i(d[0]));return $.M(b,a.xs)},VN=function(a){$.Yz.call(this,a)},WN=function(){$.bB.call(this);this.Fa("cartesian");$.T(this.ua,[["categorizedBySeries",327680,1]]);this.ie="cartesian"},XN=function(){var a=new WN;a.pa("defaultSeriesType","line");a.nd();
a.Gg();return a},YN=function(a){var b=new WN;b.Fa("area");b.pa("defaultSeriesType","area");b.ie="area";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.area(arguments[c]);return b},ZN=function(a){var b=new WN;b.Fa("bar");b.pa("defaultSeriesType","bar");b.ie="bar";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.bar(arguments[c]);return b},$N=function(a){var b=new WN;b.Fa("box");b.pa("defaultSeriesType","box");b.ie="box";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.box(arguments[c]);
return b},aO=function(a){var b=new WN;b.Fa("column");b.pa("defaultSeriesType","column");b.ie="column";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.column(arguments[c]);return b},bO=function(a){var b=new WN;b.Fa("column");b.pa("defaultSeriesType","hilo");b.ie="hilo";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.hilo(arguments[c]);return b},cO=function(a){$.Xk(405,null,["anychart.financial()","anychart.ohlc() or anychart.candlestick()"],!0);var b=new WN;b.Fa("financial");b.pa("defaultSeriesType",
"candlestick");b.ie="financial";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.candlestick(arguments[c]);return b},dO=function(a){var b=new WN;b.Fa("line");b.pa("defaultSeriesType","line");b.ie="line";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.line(arguments[c]);return b},eO=function(a){var b=new WN;b.Fa("verticalArea");b.pa("defaultSeriesType","area");b.ie="vertical-area";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.area(arguments[c]);return b},fO=function(a){var b=
new WN;b.Fa("verticalLine");b.pa("defaultSeriesType","line");b.ie="vertical-line";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.line(arguments[c]);return b},gO=function(a){var b=new WN;b.Fa("line","stick");b.pa("defaultSeriesType","stick");b.ie="stick";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.stick(arguments[c]);return b},hO=function(a){var b=new WN;b.Fa("line","jumpLine");b.pa("defaultSeriesType","jump-line");b.ie="jump-line";b.Gg();b.nd();for(var c=$.fm("jump-line"),d=0,e=
arguments.length;d<e;d++)b[c](arguments[d]);return b},iO=function(a){var b=new WN;b.Fa("line","stepLine");b.pa("defaultSeriesType","step-line");b.ie="step-line";b.Gg();b.nd();for(var c=$.fm("step-line"),d=0,e=arguments.length;d<e;d++)b[c](arguments[d]);return b},jO=function(a){var b=new WN;b.Fa("financial","ohlc");b.pa("defaultSeriesType","ohlc");b.ie="ohlc";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.ohlc(arguments[c]);return b},kO=function(a){var b=new WN;b.Fa("financial","candlestick");
b.pa("defaultSeriesType","candlestick");b.ie="candlestick";b.Gg();b.nd();for(var c=0,d=arguments.length;c<d;c++)b.candlestick(arguments[c]);return b};$.Oz.prototype.AC=$.ca(19,function(){return this.Rf.length});$.Oz.prototype.yC=$.ca(18,function(){return this.b.length});$.lO={name:"median",Nb:"path",Sb:null,Tb:"medianStroke",Wb:!0,Cb:!1,zIndex:2E-6};$.mO={name:"stem",Nb:"path",Sb:null,Tb:"stemStroke",Wb:!0,Cb:!1,zIndex:2E-6};$.nO={name:"whisker",Nb:"path",Sb:null,Tb:"whiskerStroke",Wb:!0,Cb:!1,zIndex:2E-6};
$.H(VN,$.Yz);$.SF[3]=VN;$.g=VN.prototype;$.g.type=3;$.g.flags=263936;$.g.uh={path:"path",hatchFill:"path",median:"path",stem:"path",whisker:"path"};$.g.np=["lowest","q1","median","q3","highest"];
$.g.Yf=function(a,b){var c=this.Uc.Vc(b),d=a.o("x"),e=a.o("lowest"),f=a.o("q1"),h=a.o("median"),k=a.o("q3"),l=a.o("highest"),m=UN(this.W,a,b)/2,p=this.j/2,q=c.path;$.Wz(q,this.ya,d-p,f);$.Xz(q,this.ya,d+p,f,d+p,k,d-p,k);q.close();q=c.hatchFill;$.Wz(q,this.ya,d-p,f);$.Xz(q,this.ya,d+p,f,d+p,k,d-p,k);q.close();q=c.median;$.Wz(q,this.ya,d-p,h);$.Xz(q,this.ya,d+p,h);q=c.stem;$.Wz(q,this.ya,d,e);$.Xz(q,this.ya,d,f);$.Wz(q,this.ya,d,k);$.Xz(q,this.ya,d,l);q=c.whisker;$.Wz(q,this.ya,d-m,e);$.Xz(q,this.ya,
d+m,e);$.Wz(q,this.ya,d-m,l);$.Xz(q,this.ya,d+m,l)};$.g.aB=function(a,b){var c=a.o("shapes");if(c){var d=a.o("x"),e=a.o("lowest"),f=a.o("highest"),h=UN(this.W,a,b)/2;c=c.whisker;c.clear();$.Wz(c,this.ya,d-h,e);$.Xz(c,this.ya,d+h,e);$.Wz(c,this.ya,d-h,f);$.Xz(c,this.ya,d+h,f)}};$.H(WN,$.bB);var oO={},pO=$.TF|7864320;oO.area={Bb:1,Fb:1,Kb:[$.qG,$.JG,$.EG,$.yG,$.pG,$.KG,$.FG,$.xG,$.sG,$.LG,$.GG,$.MG],Jb:null,Db:null,zb:pO,xb:"value",vb:"zero"};oO.bar={Bb:6,Fb:2,Kb:[$.TG,$.sG,$.AG,$.MG,$.CG,$.GG,$.HG,$.LG],Jb:null,Db:null,zb:pO,xb:"value",vb:"zero"};oO.box={Bb:3,Fb:2,Kb:[$.TG,$.sG,$.lO,$.mO,$.nO],Jb:null,Db:null,zb:pO,xb:"highest",vb:"lowest"};oO.bubble={Bb:4,Fb:2,Kb:[$.vG,$.wG,$.zG,$.BG],Jb:null,Db:null,zb:pO,xb:"value",vb:"value"};
oO.candlestick={Bb:5,Fb:2,Kb:[$.CG,$.GG,$.HG,$.LG],Jb:null,Db:null,zb:pO,xb:"high",vb:"low"};oO.column={Bb:6,Fb:2,Kb:[$.TG,$.sG,$.AG,$.MG,$.CG,$.GG,$.HG,$.LG],Jb:null,Db:null,zb:pO,xb:"value",vb:"zero"};oO["jump-line"]={Bb:19,Fb:2,Kb:[$.qG,$.IG,$.DG,$.rG],Jb:null,Db:null,zb:pO,xb:"value",vb:"value"};oO.line={Bb:8,Fb:1,Kb:[$.qG,$.JG,$.EG,$.yG],Jb:null,Db:null,zb:pO,xb:"value",vb:"value"};oO.marker={Bb:9,Fb:2,Kb:[$.TG,$.sG,$.AG,$.MG,$.CG,$.GG,$.HG,$.LG],Jb:null,Db:null,zb:$.TF|3670016,xb:"value",vb:"value"};
oO.ohlc={Bb:10,Fb:2,Kb:[$.DG,$.IG],Jb:null,Db:null,zb:pO,xb:"high",vb:"low"};oO["range-area"]={Bb:11,Fb:1,Kb:[$.pG,$.SG,$.OG,$.sG,$.NG,$.RG,$.uG,$.tG],Jb:null,Db:null,zb:pO,xb:"high",vb:"low"};oO["range-bar"]={Bb:12,Fb:2,Kb:[$.TG,$.sG,$.PG,$.QG,$.uG,$.tG],Jb:null,Db:null,zb:pO,xb:"high",vb:"low"};oO["range-column"]={Bb:12,Fb:2,Kb:[$.TG,$.sG,$.PG,$.QG,$.uG,$.tG],Jb:null,Db:null,zb:pO,xb:"high",vb:"low"};
oO["range-spline-area"]={Bb:13,Fb:1,Kb:[$.pG,$.OG,$.SG,$.sG,$.NG,$.RG,$.uG,$.tG],Jb:null,Db:null,zb:pO,xb:"high",vb:"low"};oO["range-step-area"]={Bb:14,Fb:1,Kb:[$.pG,$.sG,$.OG,$.SG],Jb:null,Db:null,zb:pO,xb:"high",vb:"low"};oO.spline={Bb:15,Fb:1,Kb:[$.qG,$.JG,$.EG,$.yG],Jb:null,Db:null,zb:pO,xb:"value",vb:"value"};oO["spline-area"]={Bb:16,Fb:1,Kb:[$.qG,$.JG,$.EG,$.yG,$.pG,$.KG,$.FG,$.xG,$.sG,$.LG,$.GG,$.MG],Jb:null,Db:null,zb:pO,xb:"value",vb:"zero"};
oO["step-area"]={Bb:17,Fb:1,Kb:[$.qG,$.JG,$.EG,$.yG,$.pG,$.KG,$.FG,$.xG,$.sG,$.LG,$.GG,$.MG],Jb:null,Db:null,zb:pO,xb:"value",vb:"zero"};oO["step-line"]={Bb:18,Fb:1,Kb:[$.qG,$.JG,$.EG,$.yG],Jb:null,Db:null,zb:pO,xb:"value",vb:"value"};oO.stick={Bb:20,Fb:2,Kb:[$.qG,$.IG,$.DG,$.rG],Jb:null,Db:null,zb:pO,xb:"value",vb:"zero"};oO.hilo={Bb:31,Fb:2,Kb:[$.qG,$.OG,$.SG],Jb:null,Db:null,zb:pO,xb:"high",vb:"low"};WN.prototype.Ki=oO;$.Zy(WN,WN.prototype.Ki);
WN.prototype.LL=function(a){var b=a.enabled(),c=a.ym||[],d=!0;(a=a.data()?a.data().Gb():0)&&a!=c.length||(d=!1);return b&&d};WN.prototype.UP=function(a,b,c,d){if(this.i("categorizedBySeries")){d=b.length;var e=[],f={};for(c=0;c<d;c++){var h=b[c].W.name();e.push(h);h=$.$n(h);f[h]=c}a.bB=f;a.Rg=e}else WN.B.UP.call(this,a,b,c,d)};WN.prototype.xR=function(a,b){this.i("categorizedBySeries")||WN.B.xR.call(this,a,b)};var qO={};$.Yp(qO,[[0,"categorizedBySeries",$.hq]]);$.U(WN,qO);
WN.prototype.F=function(){var a=WN.B.F.call(this);$.uq(this,qO,a.chart);return a};WN.prototype.X=function(a,b){WN.B.X.call(this,a,b);$.mq(this,qO,a)};$.zp.cartesian=XN;var rO=WN.prototype;$.F("anychart.cartesian",XN);rO.xScale=rO.Xa;rO.yScale=rO.bb;rO.crosshair=rO.Xg;rO.xGrid=rO.Tm;rO.yGrid=rO.Um;rO.xMinorGrid=rO.rr;rO.yMinorGrid=rO.ur;rO.xAxis=rO.jh;rO.getXAxesCount=rO.yC;rO.yAxis=rO.ki;rO.getYAxesCount=rO.AC;rO.getSeries=rO.Te;rO.lineMarker=rO.Fm;rO.rangeMarker=rO.Nm;rO.textMarker=rO.Rm;
rO.palette=rO.cc;rO.markerPalette=rO.pf;rO.hatchFillPalette=rO.me;rO.getType=rO.Oa;rO.addSeries=rO.Kk;rO.getSeriesAt=rO.di;rO.getSeriesCount=rO.tk;rO.removeSeries=rO.ho;rO.removeSeriesAt=rO.zn;rO.removeAllSeries=rO.fp;rO.getPlotBounds=rO.Lf;rO.xZoom=rO.uq;rO.yZoom=rO.vq;rO.xScroller=rO.mp;rO.yScroller=rO.vr;rO.getStat=rO.Ag;rO.annotations=rO.jk;rO.getXScales=rO.Kx;rO.getYScales=rO.Mx;$.zp.area=YN;$.zp.bar=ZN;$.zp.box=$N;$.zp.column=aO;$.zp.hilo=bO;$.zp.financial=cO;$.zp.line=dO;$.zp["vertical-area"]=eO;$.zp["vertical-line"]=fO;$.zp.stick=gO;$.zp["jump-line"]=hO;$.zp["step-line"]=iO;$.zp.ohlc=jO;$.zp.candlestick=kO;$.F("anychart.area",YN);$.F("anychart.bar",ZN);$.F("anychart.vertical",ZN);$.F("anychart.box",$N);$.F("anychart.column",aO);$.F("anychart.hilo",bO);$.F("anychart.financial",cO);$.F("anychart.ohlc",jO);$.F("anychart.candlestick",kO);$.F("anychart.stick",gO);
$.F("anychart.jumpLine",hO);$.F("anychart.stepLine",iO);$.F("anychart.line",dO);$.F("anychart.verticalArea",eO);$.F("anychart.verticalLine",fO);}).call(this,$)}