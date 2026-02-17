(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const Ps={"0.6C20":{UNC:189,G30:189,G60:189,G90:192},"0.6C22":{UNC:156,G30:156,G60:156,G90:159},"0.6C24":{UNC:124,G30:124,G60:124,G90:127},"0.6C26":{UNC:92,G30:92,G60:92,G90:95},"0.6C28":{UNC:81,G30:81,G60:81,G90:84},"0.6CSV20":{UNC:191,G30:191,G60:191,G90:194},"0.6CSV22":{UNC:158,G30:158,G60:158,G90:161},"0.6CSV24":{UNC:126,G30:126,G60:126,G90:129},"0.6CSV26":{UNC:94,G30:94,G60:94,G90:97},"0.6CSV28":{UNC:83,G30:83,G60:83,G90:86},"1.3C20":{UNC:208,G30:208,G60:208,G90:211},"1.3C22":{UNC:166,G30:166,G60:166,G90:169},"1.3C24":{UNC:134,G30:134,G60:134,G90:137},"1.3C26":{UNC:102,G30:102,G60:102,G90:105},"1.3CSV20":{UNC:210,G30:210,G60:210,G90:213},"1.3CSV22":{UNC:168,G30:168,G60:168,G90:171},"1.3CSV24":{UNC:136,G30:136,G60:136,G90:139},"1.3CSV26":{UNC:104,G30:104,G60:104,G90:107},"1.5B16":{UNC:334,G30:334,G60:334,G90:337},"1.5B18":{UNC:265,G30:265,G60:265,G90:268},"1.5B20":{UNC:202,G30:202,G60:202,G90:205},"1.5B22":{UNC:167,G30:167,G60:167,G90:170},"1.5BA16":{UNC:336,G30:336,G60:336,G90:339},"1.5BA18":{UNC:267,G30:267,G60:267,G90:270},"1.5BA20":{UNC:204,G30:204,G60:204,G90:207},"1.5BA22":{UNC:169,G30:169,G60:169,G90:172},"1.5BI16":{UNC:334,G30:334,G60:334,G90:337},"1.5BI18":{UNC:265,G30:265,G60:265,G90:268},"1.5BI20":{UNC:202,G30:202,G60:202,G90:205},"1.5BI22":{UNC:167,G30:167,G60:167,G90:170},"1.5BIA16":{UNC:336,G30:336,G60:336,G90:339},"1.5BIA18":{UNC:267,G30:267,G60:267,G90:270},"1.5BIA20":{UNC:204,G30:204,G60:204,G90:207},"1.5BIA22":{UNC:169,G30:169,G60:169,G90:172},"1.5BP16":{UNC:0,G30:0,G60:0,G90:0},"1.5BP16/18":{UNC:0,G30:0,G60:0,G90:0},"1.5BP18":{UNC:0,G30:0,G60:0,G90:0},"1.5BP18/16":{UNC:0,G30:0,G60:0,G90:0},"1.5BP18/20":{UNC:0,G30:0,G60:0,G90:0},"1.5BP20":{UNC:0,G30:0,G60:0,G90:0},"1.5BP20/18":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA16":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA16/18":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA18":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA18/16":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA18/20":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA20":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA20/18":{UNC:0,G30:0,G60:0,G90:0},"1.5C16":{UNC:334,G30:334,G60:334,G90:337},"1.5C18":{UNC:265,G30:265,G60:265,G90:268},"1.5C20":{UNC:202,G30:202,G60:202,G90:205},"1.5C22":{UNC:167,G30:167,G60:167,G90:170},"1.5VL16":{UNC:334,G30:334,G60:334,G90:337},"1.5VL18":{UNC:265,G30:265,G60:265,G90:268},"1.5VL19":{UNC:238,G30:238,G60:238,G90:241},"1.5VL20":{UNC:202,G30:202,G60:202,G90:205},"1.5VL22":{UNC:167,G30:167,G60:167,G90:170},"1.5VLI16":{UNC:334,G30:334,G60:334,G90:337},"1.5VLI18":{UNC:265,G30:265,G60:265,G90:268},"1.5VLI19":{UNC:238,G30:238,G60:238,G90:241},"1.5VLI20":{UNC:202,G30:202,G60:202,G90:205},"1.5VLI22":{UNC:167,G30:167,G60:167,G90:170},"1.5VLP16":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP16/18":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP18":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP18/16":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP18/20":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP20":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP20/18":{UNC:0,G30:0,G60:0,G90:0},"1.5VLR16":{UNC:334,G30:334,G60:334,G90:337},"1.5VLR18":{UNC:265,G30:265,G60:265,G90:268},"1.5VLR19":{UNC:238,G30:238,G60:238,G90:241},"1.5VLR20":{UNC:202,G30:202,G60:202,G90:205},"1.5VLR22":{UNC:167,G30:167,G60:167,G90:170},"1C20":{UNC:199,G30:199,G60:199,G90:202},"1C22":{UNC:159,G30:159,G60:159,G90:162},"1C24":{UNC:134,G30:134,G60:134,G90:137},"1C26":{UNC:102,G30:102,G60:102,G90:105},"1CSV20":{UNC:201,G30:201,G60:201,G90:204},"1CSV22":{UNC:161,G30:161,G60:161,G90:164},"1CSV24":{UNC:136,G30:136,G60:136,G90:139},"1CSV26":{UNC:104,G30:104,G60:104,G90:107},"1E20":{UNC:199,G30:199,G60:199,G90:202},"1E22":{UNC:159,G30:159,G60:159,G90:162},"1E24":{UNC:134,G30:134,G60:134,G90:137},"1E26":{UNC:102,G30:102,G60:102,G90:105},"2C18":{UNC:185,G30:185,G60:185,G90:188},"2C20":{UNC:218,G30:218,G60:218,G90:221},"2C22":{UNC:187,G30:187,G60:187,G90:190},"2C24":{UNC:145,G30:145,G60:145,G90:148},"2CSV18":{UNC:289,G30:289,G60:289,G90:292},"2CSV20":{UNC:220,G30:220,G60:220,G90:223},"2CSV22":{UNC:189,G30:189,G60:189,G90:192},"2CSV24":{UNC:147,G30:147,G60:147,G90:150},"2D16":{UNC:0,G30:0,G60:0,G90:0},"2D18":{UNC:0,G30:0,G60:0,G90:0},"2D20":{UNC:0,G30:0,G60:0,G90:0},"2D22":{UNC:0,G30:0,G60:0,G90:0},"2DA16":{UNC:0,G30:0,G60:0,G90:0},"2DA18":{UNC:0,G30:0,G60:0,G90:0},"2DA20":{UNC:0,G30:0,G60:0,G90:0},"2DA22":{UNC:0,G30:0,G60:0,G90:0},"2DAFORMLOK16":{UNC:0,G30:0,G60:0,G90:0},"2DAFORMLOK18":{UNC:0,G30:0,G60:0,G90:0},"2DAFORMLOK20":{UNC:0,G30:0,G60:0,G90:0},"2DAFORMLOK22":{UNC:0,G30:0,G60:0,G90:0},"2DFORMLOK16":{UNC:0,G30:0,G60:0,G90:0},"2DFORMLOK18":{UNC:0,G30:0,G60:0,G90:0},"2DFORMLOK20":{UNC:0,G30:0,G60:0,G90:0},"2DFORMLOK22":{UNC:0,G30:0,G60:0,G90:0},"2VLI16":{UNC:317,G30:317,G60:317,G90:320},"2VLI18":{UNC:251,G30:251,G60:251,G90:254},"2VLI19":{UNC:217,G30:217,G60:217,G90:220},"2VLI20":{UNC:191,G30:191,G60:191,G90:194},"2VLI22":{UNC:158,G30:158,G60:158,G90:161},"2VLP16":{UNC:0,G30:0,G60:0,G90:0},"2VLP16/18":{UNC:0,G30:0,G60:0,G90:0},"2VLP18":{UNC:0,G30:0,G60:0,G90:0},"2VLP18/16":{UNC:0,G30:0,G60:0,G90:0},"2VLP18/20":{UNC:0,G30:0,G60:0,G90:0},"2VLP20":{UNC:0,G30:0,G60:0,G90:0},"2VLP20/18":{UNC:0,G30:0,G60:0,G90:0},"2VLPA16":{UNC:0,G30:0,G60:0,G90:0},"2VLPA16/18":{UNC:0,G30:0,G60:0,G90:0},"2VLPA18":{UNC:0,G30:0,G60:0,G90:0},"2VLPA18/16":{UNC:0,G30:0,G60:0,G90:0},"2VLPA18/20":{UNC:0,G30:0,G60:0,G90:0},"2VLPA20":{UNC:0,G30:0,G60:0,G90:0},"2VLPA20/18":{UNC:0,G30:0,G60:0,G90:0},"3.5D16":{UNC:0,G30:0,G60:0,G90:0},"3.5D18":{UNC:0,G30:0,G60:0,G90:0},"3.5D20":{UNC:0,G30:0,G60:0,G90:0},"3.5DA16":{UNC:0,G30:0,G60:0,G90:0},"3.5DA18":{UNC:0,G30:0,G60:0,G90:0},"3.5DA20":{UNC:0,G30:0,G60:0,G90:0},"3.5DAFORMLOK16":{UNC:0,G30:0,G60:0,G90:0},"3.5DAFORMLOK18":{UNC:0,G30:0,G60:0,G90:0},"3.5DAFORMLOK20":{UNC:0,G30:0,G60:0,G90:0},"3.5DFORMLOK16":{UNC:0,G30:0,G60:0,G90:0},"3.5DFORMLOK18":{UNC:0,G30:0,G60:0,G90:0},"3.5DFORMLOK20":{UNC:0,G30:0,G60:0,G90:0},"3N-2416":{UNC:411,G30:411,G60:411,G90:414},"3N-2418":{UNC:325,G30:325,G60:325,G90:328},"3N-2420":{UNC:248,G30:248,G60:248,G90:251},"3N-2422":{UNC:205,G30:205,G60:205,G90:208},"3NA-2416":{UNC:413,G30:413,G60:413,G90:416},"3NA-2418":{UNC:327,G30:327,G60:327,G90:330},"3NA-2420":{UNC:250,G30:250,G60:250,G90:253},"3NA-2422":{UNC:207,G30:207,G60:207,G90:210},"3NI-2416":{UNC:411,G30:411,G60:411,G90:414},"3NI-2418":{UNC:325,G30:325,G60:325,G90:328},"3NI-2420":{UNC:248,G30:248,G60:248,G90:251},"3NI-2422":{UNC:205,G30:205,G60:205,G90:208},"3NI-3216":{UNC:390,G30:390,G60:390,G90:393},"3NI-3218":{UNC:309,G30:309,G60:309,G90:312},"3NI-3220":{UNC:235,G30:235,G60:235,G90:238},"3NI-3222":{UNC:195,G30:195,G60:195,G90:198},"3NIA-2416":{UNC:413,G30:413,G60:413,G90:416},"3NIA-2418":{UNC:327,G30:327,G60:327,G90:330},"3NIA-2420":{UNC:250,G30:250,G60:250,G90:253},"3NIA-2422":{UNC:207,G30:207,G60:207,G90:210},"3NIA-3216":{UNC:392,G30:392,G60:392,G90:395},"3NIA-3218":{UNC:311,G30:311,G60:311,G90:314},"3NIA-3220":{UNC:237,G30:237,G60:237,G90:240},"3NIA-3222":{UNC:197,G30:197,G60:197,G90:200},"3NL-3216":{UNC:390,G30:390,G60:390,G90:393},"3NL-3218":{UNC:309,G30:309,G60:309,G90:312},"3NL-3220":{UNC:235,G30:235,G60:235,G90:238},"3NL-3222":{UNC:195,G30:195,G60:195,G90:198},"3NLA-3216":{UNC:392,G30:392,G60:392,G90:395},"3NLA-3218":{UNC:311,G30:311,G60:311,G90:314},"3NLA-3220":{UNC:237,G30:237,G60:237,G90:240},"3NLA-3222":{UNC:197,G30:197,G60:197,G90:200},"3NP-2416":{UNC:0,G30:0,G60:0,G90:0},"3NP-2416/18":{UNC:0,G30:0,G60:0,G90:0},"3NP-2418":{UNC:0,G30:0,G60:0,G90:0},"3NP-2418/16":{UNC:0,G30:0,G60:0,G90:0},"3NP-2418/20":{UNC:0,G30:0,G60:0,G90:0},"3NP-2420":{UNC:0,G30:0,G60:0,G90:0},"3NP-2420/18":{UNC:0,G30:0,G60:0,G90:0},"3NP-3216":{UNC:0,G30:0,G60:0,G90:0},"3NP-3216/18":{UNC:0,G30:0,G60:0,G90:0},"3NP-3218":{UNC:0,G30:0,G60:0,G90:0},"3NP-3218/16":{UNC:0,G30:0,G60:0,G90:0},"3NP-3218/20":{UNC:0,G30:0,G60:0,G90:0},"3NP-3220":{UNC:0,G30:0,G60:0,G90:0},"3NP-3220/18":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2416":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2416/18":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2418":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2418/16":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2418/20":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2420":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2420/18":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3216":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3216/18":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3218":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3218/16":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3218/20":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3220":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3220/18":{UNC:0,G30:0,G60:0,G90:0},"3VLI16":{UNC:357,G30:357,G60:357,G90:360},"3VLI18":{UNC:283,G30:283,G60:283,G90:286},"3VLI19":{UNC:248,G30:248,G60:248,G90:251},"3VLI20":{UNC:215,G30:215,G60:215,G90:218},"3VLI22":{UNC:178,G30:178,G60:178,G90:181},"3VLP16":{UNC:0,G30:0,G60:0,G90:0},"3VLP16/18":{UNC:0,G30:0,G60:0,G90:0},"3VLP18":{UNC:0,G30:0,G60:0,G90:0},"3VLP18/16":{UNC:0,G30:0,G60:0,G90:0},"3VLP18/20":{UNC:0,G30:0,G60:0,G90:0},"3VLP20":{UNC:0,G30:0,G60:0,G90:0},"3VLP20/18":{UNC:0,G30:0,G60:0,G90:0},"3VLPA16":{UNC:0,G30:0,G60:0,G90:0},"3VLPA16/18":{UNC:0,G30:0,G60:0,G90:0},"3VLPA18":{UNC:0,G30:0,G60:0,G90:0},"3VLPA18/16":{UNC:0,G30:0,G60:0,G90:0},"3VLPA18/20":{UNC:0,G30:0,G60:0,G90:0},"3VLPA20":{UNC:0,G30:0,G60:0,G90:0},"3VLPA20/18":{UNC:0,G30:0,G60:0,G90:0}};window.DECK_LBS_PER_SQ=Ps;const Dn={CANO:{poundsPerTon:2e3,ratePerPound:1.89}},Ei="trojan_admin_pricing_v1",Ni="trojan_admin_changelog_v1",Ai="admin_trojan_min_project_margin_v1",yi="admin_detailing_buckets_v1",hi="suppliersTable_v1",Gi="proposalData_v1",mn="trojan_calculator_draft_v1",Mn="trojan_proposal_quote_counter_v1",Rn="trojan_proposal_quote_log_v1",$s="TROJ26",on=274,Un="GOOGLE_MAPS_API_KEY",ut={trojan:{label:"TROJAN",fields:[{key:"coilCostPerLb",label:"COIL COST ($/LB)",type:"currency"},{key:"inboundFreightPerLb",label:"INBOUND FREIGHT ($/LB)",type:"currency"},{key:"laborPerLb",label:"LABOR ($/LB)",type:"currency"},{key:"outboundFreightPerMi",label:"OUTBOUND FREIGHT ($/MI)",type:"currency"},{key:"facilityAddress",label:"FACILITY ADDRESS",type:"text"},{key:"accessoriesCostPerScrew",label:"COST PER SCREW ($)",type:"currency"},{key:"accessoriesCostPerTon",label:"ACCESSORIES COST PER TON ($/TON)",type:"currency"},{key:"minimumProjectMargin",label:"Minimum Project Margin",type:"currency"}]},csc:{label:"CSC",fields:[]},cano:{label:"CANO",fields:[{key:"perLb",label:"$/LB",type:"currency"}]},detailing:{label:"DETAILING",fields:[]}},Li={inbound:["coilCostPerLb","inboundFreightPerLb"],mfg:["laborPerLb"],outbound:["outboundFreightPerMi","facilityAddress"],accessories:["accessoriesCostPerScrew","accessoriesCostPerTon"],leadTimes:[],margins:["minimumProjectMargin"],conditions:[]},ji=[{value:"PAGE_1",label:"PAGE 1"},{value:"STANDARD_EXCLUSIONS",label:"STANDARD EXCLUSIONS"},{value:"STANDARD_QUALIFICATIONS",label:"STANDARD QUALIFICATIONS"},{value:"GENERAL_SALE_TERMS",label:"GENERAL SALE TERMS"},{value:"GENERAL_SALE_TERMS_CONTINUED",label:"GENERAL SALE TERMS (CONTINUED)"},{value:"ACKNOWLEDGMENT",label:"ACKNOWLEDGMENT"}],Ii=ji.map(t=>t.value),Oi=[{start:0,end:9},{start:10,end:24},{start:25,end:49},{start:50,end:99},{start:100,end:1e3}],Ds=Oi.map((t,e)=>({...t,cost:[6e3,4500,4e3,3500,3e3][e]})),Ms=Oi.map((t,e)=>({...t,cost:[6e3,4e3,3500,2500,2100][e]})),Rs=[{start:0,end:9},{start:10,end:24},{start:25,end:49},{start:50,end:99},{start:100,end:299},{start:300,end:1e3}],$e=["DECK+JOISTS","DECK_ONLY","JOIST_ONLY"],De=[1,2,3],qt=["TROJAN","CSC","CANO"];function U(t){if(t==null)return"";const e=String(t).trim();if(e==="")return"";const n=Number.parseInt(e,10);return!Number.isFinite(n)||n<0?"":n}function Me(){return{trojan:{submittalsDeckOnly:{min:"",max:""},submittalsJoistsUnder50:{min:"",max:""},submittalsDeckAndJoistsOver50:{min:"",max:""},fabrication:{min:"",max:""}},csc:{fabrication:{min:"",max:""}},cano:{fabrication:{min:"",max:""}}}}function $t(t){var s,o,a,r,c,d,l,u,p,g,f,k,T,E,S,C,b,y,L,j,w,X,Q,it,st;const e=Me(),n=((s=t==null?void 0:t.trojan)==null?void 0:s.submittals)||{};return{trojan:{submittalsDeckOnly:{min:U(((a=(o=t==null?void 0:t.trojan)==null?void 0:o.submittalsDeckOnly)==null?void 0:a.min)??(n==null?void 0:n.min)??e.trojan.submittalsDeckOnly.min),max:U(((c=(r=t==null?void 0:t.trojan)==null?void 0:r.submittalsDeckOnly)==null?void 0:c.max)??(n==null?void 0:n.max)??e.trojan.submittalsDeckOnly.max)},submittalsJoistsUnder50:{min:U(((l=(d=t==null?void 0:t.trojan)==null?void 0:d.submittalsJoistsUnder50)==null?void 0:l.min)??(n==null?void 0:n.min)??e.trojan.submittalsJoistsUnder50.min),max:U(((p=(u=t==null?void 0:t.trojan)==null?void 0:u.submittalsJoistsUnder50)==null?void 0:p.max)??(n==null?void 0:n.max)??e.trojan.submittalsJoistsUnder50.max)},submittalsDeckAndJoistsOver50:{min:U(((f=(g=t==null?void 0:t.trojan)==null?void 0:g.submittalsDeckAndJoistsOver50)==null?void 0:f.min)??(n==null?void 0:n.min)??e.trojan.submittalsDeckAndJoistsOver50.min),max:U(((T=(k=t==null?void 0:t.trojan)==null?void 0:k.submittalsDeckAndJoistsOver50)==null?void 0:T.max)??(n==null?void 0:n.max)??e.trojan.submittalsDeckAndJoistsOver50.max)},fabrication:{min:U(((S=(E=t==null?void 0:t.trojan)==null?void 0:E.fabrication)==null?void 0:S.min)??e.trojan.fabrication.min),max:U(((b=(C=t==null?void 0:t.trojan)==null?void 0:C.fabrication)==null?void 0:b.max)??e.trojan.fabrication.max)}},csc:{fabrication:{min:U(((L=(y=t==null?void 0:t.csc)==null?void 0:y.fabrication)==null?void 0:L.min)??e.csc.fabrication.min),max:U(((w=(j=t==null?void 0:t.csc)==null?void 0:j.fabrication)==null?void 0:w.max)??e.csc.fabrication.max)}},cano:{fabrication:{min:U(((Q=(X=t==null?void 0:t.cano)==null?void 0:X.fabrication)==null?void 0:Q.min)??e.cano.fabrication.min),max:U(((st=(it=t==null?void 0:t.cano)==null?void 0:it.fabrication)==null?void 0:st.max)??e.cano.fabrication.max)}}}}const Pi=[{SUPPLIER:"TROJAN",DECK:"TRUE",DEPTH:"1.5, 2.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"FALSE",PRIORITY:"1","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"},{SUPPLIER:"CANO",DECK:"TRUE",DEPTH:"0.6, 1.0, 1.5, 2.0, 3.0",JOISTS:"TRUE","AMERICAN STEEL REQUIRED":"FALSE","AMERICAN MANUFACTURING":"FALSE","SDI MANUFACTURING":"TRUE",PRIORITY:"2","JOIST LOCATION":"MEXICO","DECK LOCATION":"MEXICO"},{SUPPLIER:"CSC",DECK:"TRUE",DEPTH:"0.6, 1.0, 1.3, 1.5, 2.0, 3.0, 3.5, 4.0",JOISTS:"TRUE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"3","JOIST LOCATION":"MO","DECK LOCATION":"FL"},{SUPPLIER:"CUTTING EDGE",DECK:"TRUE",DEPTH:"1.5, 2.0, 3.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"4","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"},{SUPPLIER:"CORDECK",DECK:"TRUE",DEPTH:"0.6, 1.5, 2.0, 3.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"5","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"},{SUPPLIER:"CSM",DECK:"TRUE",DEPTH:"0.6, 1.0, 1.5, 2.0, 3.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"6","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"},{SUPPLIER:"HOUSTONBDECK",DECK:"TRUE",DEPTH:"1.5, 2.0, 3.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"7","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"}];function an(t){return t.map(e=>({...e}))}function wn(t,e){return Array.isArray(t)?e.map((n,s)=>{const o=t[s]||{};return{start:v(o.start??n.start),end:v(o.end??n.end),cost:v(o.cost??o.rate??n.cost)}}):t&&typeof t=="object"?e.map(n=>{const s=`${n.start}-${n.end}`;return{start:n.start,end:n.end,cost:v(t[s]??n.cost)}}):an(e)}function Ee(){const t=Me();return{joists:{buckets:an(Ds),extraShippingFee_0_9:3500},deck:{buckets:an(Ms)},leadTimes:t.csc}}function de(t){const e=Ee(),n=Ee(),s=t==null?void 0:t.joists,o=t==null?void 0:t.deck;return n.joists.buckets=wn((s==null?void 0:s.buckets)??(s==null?void 0:s.bucketPrices),e.joists.buckets),n.deck.buckets=wn((o==null?void 0:o.buckets)??(o==null?void 0:o.bucketPrices),e.deck.buckets),n.joists.extraShippingFee_0_9=v((s==null?void 0:s.extraShippingFee_0_9)??e.joists.extraShippingFee_0_9),n.leadTimes=$t({csc:t==null?void 0:t.leadTimes}).csc,n}function $i(){return{perLb:"",leadTimes:Me().cano}}function Re(t){const e=$i();return{perLb:v((t==null?void 0:t.perLb)??e.perLb),leadTimes:$t({cano:t==null?void 0:t.leadTimes}).cano}}function Us(t,e,n){const s=[3.5,3.75,4,4.25,4.5,4.75],o=t==="DECK_ONLY"?-.5:t==="JOIST_ONLY"?-.25:0,a=e===1?0:e===2?.25:.5,r=s[n]+o+a;return Math.max(3,Math.min(5,Math.round(r*100)/100))}function Di(){const t=[];return $e.forEach(e=>{De.forEach(n=>{Rs.forEach((s,o)=>{t.push({start:s.start,end:s.end,scopeType:e,tier:n,detailingPercent:Us(e,n,o)})})})}),{minimumFee:500,buckets:t}}function ct(t){const e=Di(),s=(Array.isArray(t==null?void 0:t.buckets)?t.buckets:Array.isArray(t)?t:[]).map(o=>({start:v(o==null?void 0:o.start),end:v(o==null?void 0:o.end),scopeType:String((o==null?void 0:o.scopeType)||(o==null?void 0:o.scope)||"").trim().toUpperCase(),tier:Number.parseInt(String((o==null?void 0:o.tier)??""),10),detailingPercent:v((o==null?void 0:o.detailingPercent)??(o==null?void 0:o.percent))})).filter(o=>Number.isFinite(o.start)&&Number.isFinite(o.end)&&$e.includes(o.scopeType)&&De.includes(o.tier));return{minimumFee:v((t==null?void 0:t.minimumFee)??e.minimumFee),buckets:s.length>0?s:e.buckets}}function gn(t){return Array.isArray(t)?t.map((e,n)=>{const s=Number.parseInt(String((e==null?void 0:e.id)??""),10),o=String((e==null?void 0:e.slot)||"").trim().toUpperCase(),a=Ii.includes(o)?o:"GENERAL_SALE_TERMS_CONTINUED",r=String((e==null?void 0:e.text)||"").trim(),c=Number.parseInt(String((e==null?void 0:e.afterNumber)??""),10);return{id:Number.isFinite(s)&&s>0?s:n+1,slot:a,text:r,afterNumber:Number.isFinite(c)&&c>=0?c:0}}).filter(e=>e.text!==""):[]}function Mi(){const t=Me();return{sections:{trojan:{values:{coilCostPerLb:"",inboundFreightPerLb:"",laborPerLb:"",outboundFreightPerMi:"",facilityAddress:"",accessoriesCostPerScrew:"",accessoriesCostPerTon:"",minimumProjectMargin:4e3,documentConditions:[],leadTimes:t.trojan},isCollapsed:!0,isEditing:!1,subsections:{inbound:{isCollapsed:!0,isEditing:!1},mfg:{isCollapsed:!0,isEditing:!1},outbound:{isCollapsed:!0,isEditing:!1},accessories:{isCollapsed:!0,isEditing:!1},leadTimes:{isCollapsed:!0,isEditing:!1,error:""},margins:{isCollapsed:!0,isEditing:!1},conditions:{isCollapsed:!0,isEditing:!1}}},csc:{values:Ee(),isCollapsed:!0,isEditing:!1,subsections:{joists:{isCollapsed:!0,isEditing:!1},deck:{isCollapsed:!0,isEditing:!1},leadTimes:{isCollapsed:!0,isEditing:!1,error:""}}},cano:{values:$i(),isCollapsed:!0,isEditing:!1,subsections:{leadTimes:{isCollapsed:!0,isEditing:!1,error:""}}},detailing:{values:Di(),isCollapsed:!0,isEditing:!1}},changelog:[]}}const i={projectName:"",projectLocation:"",projectComplexityTier:"2",submittalsLeadTime:"",fabricationLeadTime:"",takeoffByTrojan:"YES",cutListProvided:"NO",specsReviewed:"NO",milesFromTrojanFacility:"",scope:"joist-deck",currentPage:"project",adminReturnPage:"project",deckSpecsCollapsed:!1,deckReviewMode:!1,joistReviewMode:!1,deckFlags:{americanSteelRequired:!1,americanManufacturing:!1,sdiManufacturer:!1,specifiedManufacturer:!1,specifiedManufacturerName:""},deckFlagSelectionOrder:[],deckProfiles:[],accessories:[],admin:Mi(),joists:{supplier:"CSC",tons:""},joistItems:[],takeoff:{bidNo:"",jobNumber:"",jobName:"",projectLocation:"",areas:[],nextAreaNumber:1},totals:{joistsTotal:0,totalDeckSqs:0,deckTotal:0,totalDeckTons:0,trojanDeckTons:0,brokeredDeckTons:0,trojanShipping:0,trojanShippingTrucks:0,trojanShippingMiles:0,trojanShippingRate:0,grandTotal:0},pricingSections:{trojanDeck:!0,brokeredDeck:!0,accessories:!1,joists:!0,detailing:!0},pricingDetailing:{detailingPercentAuto:0,detailingPercentOverride:null,detailingAmount:0,subtotal:0,finalTotal:0},pricingOptimizationVisible:!1,pricingOptimizationLoading:!1,pricingOptimizationScenarios:[],appliedOptimizationSelection:{deckMode:"auto",deckVendor:"",deckAssignments:[],joistVendor:"",label:""},pricingMargins:{trojanDeck:15,brokeredDeck:5,joists:5},pricingMarginOverrides:{trojanDeck:!1,brokeredDeck:!1,joists:!1},vendorPlan:null,suppliers:{columns:[],rows:[],draftRows:[],isLoaded:!1,isEditing:!1,isLoading:!1,loadError:"",nameColumnKey:""}},ws=document.getElementById("page-project"),P=document.getElementById("page-takeoff"),Ri=document.getElementById("page-deck"),Bs=document.getElementById("page-joist"),le=document.getElementById("page-pricing"),Rt=document.getElementById("page-admin"),qe=document.getElementById("page-suppliers"),Ut=document.getElementById("mainTabsNav"),Bn=Array.from(document.querySelectorAll("[data-main-tab]")),Fs=Ri.querySelector(".totals-summary-block"),xs=document.getElementById("projectNameDisplay"),Ne=document.getElementById("projectNameInput"),Et=document.getElementById("takeoffBidNoInput"),Nt=document.getElementById("takeoffJobNumberInput"),At=document.getElementById("takeoffJobNameInput"),bt=document.getElementById("takeoffProjectLocationInput"),ze=document.getElementById("takeoffAddAreaButton"),Tt=document.getElementById("takeoffDoneButton"),He=document.getElementById("takeoffAreasList"),re=document.getElementById("projectLocationInput"),yt=document.getElementById("projectComplexityInput"),tt=document.getElementById("submittalsLeadTimeInput"),et=document.getElementById("fabricationLeadTimeInput"),ht=document.getElementById("takeoffByTrojanInput"),Gt=document.getElementById("cutListProvidedInput"),Lt=document.getElementById("specsReviewedInput"),kt=document.getElementById("milesFromTrojanInput"),Ui=document.getElementById("projectNextButton"),Js=document.getElementById("adminOpenButton"),_s=document.getElementById("adminBackButton"),Vs=document.getElementById("adminCloseButton"),Ke=document.getElementById("adminSuppliersButton"),qs=document.getElementById("adminChangelogButton"),nt=document.getElementById("adminSectionsList"),wi=document.getElementById("adminChangelogDialog"),Fn=document.getElementById("adminChangelogList"),zs=document.getElementById("adminChangelogCloseButton"),wt=document.getElementById("resetProjectSideBtn"),Bi=Array.from(document.querySelectorAll('input[name="scopeInput"]')),Hs=document.getElementById("deckBackButton"),Se=document.getElementById("deckNextButton"),Ks=document.getElementById("joistBackButton"),Fi=document.getElementById("joistNextButton"),Ws=document.getElementById("pricingBackButton"),We=document.getElementById("resetProjectBtn"),Ys=document.getElementById("pricingStartButton"),Bt=document.getElementById("pricingOptimizeButton"),Ye=document.getElementById("pricingProposalButton"),dt=document.getElementById("pricingOptimizeResults"),ce=document.getElementById("supplierInput"),W=document.getElementById("joistItemsList"),oe=document.getElementById("addJoistButton"),Ft=document.getElementById("joistReviewButton"),te=document.getElementById("joistReviewSummary"),jt=document.getElementById("deckProfilesList"),fn=document.getElementById("duplicateProfileDialog"),xi=document.getElementById("duplicateProfileSelect"),Qs=document.getElementById("duplicateConfirmButton"),Xs=document.getElementById("duplicateCancelButton"),Zs=document.getElementById("totalDeckSqsOutput"),Ji=document.getElementById("deckTotalOutput"),to=document.getElementById("totalDeckTonsOutput"),xn=document.getElementById("pricingJoistsTotalOutput"),Jn=document.getElementById("pricingDeckSqsOutput"),_n=document.getElementById("pricingDeckTotalOutput"),Vn=document.getElementById("pricingDeckTonsOutput"),qn=document.getElementById("pricingTrojanShippingRow"),zn=document.getElementById("pricingTrojanShippingCost"),Hn=document.getElementById("pricingTrojanShippingMeta"),Kn=document.getElementById("grandTotalOutput"),Wn=document.getElementById("deckTrojanTonsOutput"),Yn=document.getElementById("deckBrokeredTonsOutput"),Qn=document.getElementById("pricingTrojanDeckSchedule"),Xn=document.getElementById("pricingBrokeredDeckSchedule"),Zn=document.getElementById("pricingJoistVendorSchedule"),ti=document.getElementById("pricingBrokeredDeckName"),ei=document.getElementById("pricingJoistsName"),ni=document.getElementById("pricingTrojanHeaderCogs"),ii=document.getElementById("pricingAccessoriesHeaderCogs"),si=document.getElementById("pricingBrokeredHeaderCogs"),oi=document.getElementById("pricingJoistsHeaderCogs"),ai=document.getElementById("pricingDetailingHeaderCogs"),ri=document.getElementById("pricingTonnageTotalOutput"),ci=document.getElementById("pricingSubtotalOutput"),di=document.getElementById("pricingProjectTotalCostOutput"),li=document.getElementById("pricingMarginSummaryOutput"),be=document.getElementById("pricingTrojanDeckSection"),Qe=document.getElementById("pricingBrokeredDeckSection"),Xe=document.getElementById("pricingAccessoriesSection"),Ze=document.getElementById("pricingJoistsSection"),tn=document.getElementById("pricingDetailingSection"),eo=document.getElementById("pricingTrojanDeckContent"),no=document.getElementById("pricingBrokeredDeckContent"),io=document.getElementById("pricingAccessoriesContent"),so=document.getElementById("pricingJoistsContent"),oo=document.getElementById("pricingDetailingContent"),ui=document.getElementById("pricingTrojanDeckCogs"),pi=document.getElementById("pricingAccessoriesSchedule"),mi=document.getElementById("pricingDetailingSchedule"),xt=document.getElementById("suppliersEditButton"),Jt=document.getElementById("suppliersSaveButton"),_t=document.getElementById("suppliersCancelButton"),Vt=document.getElementById("suppliersAddRowButton"),en=document.getElementById("suppliersBackButton"),gi=document.getElementById("suppliersStatusText"),at=document.getElementById("suppliersTableContainer"),ve=typeof window<"u"&&window.DECK_LBS_PER_SQ&&typeof window.DECK_LBS_PER_SQ=="object"?window.DECK_LBS_PER_SQ:{},q={depth:["0.6","1.0","1.3","1.5","2.0","3.0","3.5","4.0"],manufacturer:["Trojan","CSC","CANO","Cutting Edge","Cordeck","CSM","HoustonBDeck"],profile:["B","BA","BI","BIA","BP","BPA","C","CSV","D","D FormLok","DA","DA FormLok","E","N-24","NA-24","NI-24","NI-32","NIA-24","NIA-32","NL-32","NLA-32","NP-24","NP-32","NPA-24","NPA-32","TORIS","VL","VLI","VLP","VLPA","VLR"],gage:["16","18","19","20","22","24","26","28","16/18","18/16","18/20","20/18"],finish:["G30","G60","G90","UNC"],paintTop:["G","W","N"],paintBottom:["G","W","N"],grade:["33","40","50","80"]},ao=[{value:"",label:""},{value:"SQS",label:"SQS"},{value:"SqFt",label:"SqFt"},{value:"LF",label:"LF"},{value:"Cut List",label:"Cut List"}],ro={americanSteelRequired:"AMERICAN STEEL REQUIRED",americanManufacturing:"AMERICAN MANUFACTURING",sdiManufacturer:"SDI MANUFACTURER",specifiedManufacturer:"SPECIFIED MANUFACTURER"},co=["#10TEKSCREWS","#12TEKSCREWS","CC1","CC2","CC3"];let bn=1,kn=1,Cn=1,ue=1,Sn=1,Ae=1;const lo=["depth","profile","gage","finish","grade"],uo=["depth","profile","gage","finish"],_i=["K-SERIES","LH-SERIES","DLH-SERIES","SP-SERIES","GIRDERS","BRIDGING"];let ke=!1,Ce=null;const po=new WeakMap;let fi=null,Dt="",bi=0,ot=null;function h(t){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}function Y(t){return new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}).format(t)}function G(t){const e=Number.isFinite(t)&&t>0?t:0;return new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}function m(t){const e=Number(t);return Number.isNaN(e)||e<=0?0:e}function It(t){return!t||!Object.prototype.hasOwnProperty.call(i.pricingMargins,t)?0:m(i.pricingMargins[t])}function rt(t,e){const n=It(e),s=t*(n/100);return{marginPercent:n,marginAmount:s,totalWithMargin:t+s}}const ki=["TROJAN","CSC","CANO","CUTTING EDGE","CORDECK","CSM","HOUSTON B DECK","HOUSTONBDECK"];function vn(){return v(i.admin.sections.trojan.values.minimumProjectMargin||4e3)}function Vi(t,e){const n=m(e);if(!Array.isArray(t)||t.length===0||n<=0)return;let s=t.reduce((a,r)=>a+m(r.marginAmount),0),o=Math.max(0,n-s);if(!(o<=0))for(let a=0;a<ki.length&&!(o<=0);a+=1){const r=ki[a],c=Ht(r),d=t.find(l=>Ht(l.supplier)===c);d&&(d.locked||m(d.subtotalCost)<=0||(d.marginAmount+=o,typeof d.sync=="function"&&d.sync(d.marginAmount),s+=o,o=Math.max(0,n-s)))}}function v(t,e={}){const{blankAsZero:n=!0}=e;if(t==null)return n?0:Number.NaN;const s=String(t).trim();if(s==="")return n?0:Number.NaN;const o=s.replace(/[^0-9.]/g,"");if(o==="")return n?0:Number.NaN;const a=o.indexOf("."),r=a===-1?o:`${o.slice(0,a)}.${o.slice(a+1).replace(/\./g,"")}`,c=Number.parseFloat(r);return Number.isNaN(c)||c<0?0:c}function M(t,e={}){const{blankAsEmpty:n=!1}=e;if(n&&(t===""||t===null||t===void 0))return"";const s=v(t);return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(s)}function mo(t){const e=new Date(t);return new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(e)}function zt(){const t={};Object.keys(ut).forEach(e=>{t[e]={},ut[e].fields.forEach(n=>{n.type==="text"?t[e][n.key]=String(i.admin.sections[e].values[n.key]||"").trim():t[e][n.key]=v(i.admin.sections[e].values[n.key])})}),t.csc=de(i.admin.sections.csc.values),t.cano=Re(i.admin.sections.cano.values),t.detailing=ct(i.admin.sections.detailing.values),t.trojan.documentConditions=gn(i.admin.sections.trojan.values.documentConditions),t.leadTimes=$t({trojan:i.admin.sections.trojan.values.leadTimes,csc:i.admin.sections.csc.values.leadTimes,cano:i.admin.sections.cano.values.leadTimes}),localStorage.setItem(Ei,JSON.stringify(t)),localStorage.setItem(Ai,String(v(i.admin.sections.trojan.values.minimumProjectMargin))),localStorage.setItem(yi,JSON.stringify(ct(i.admin.sections.detailing.values).buckets)),localStorage.setItem(Ni,JSON.stringify(i.admin.changelog))}function go(){var o;i.admin=Mi();const t=localStorage.getItem(Ei);if(t)try{const a=JSON.parse(t);Object.keys(ut).forEach(c=>{const d=ut[c].fields,l=a==null?void 0:a[c];!l||typeof l!="object"||d.forEach(u=>{Object.prototype.hasOwnProperty.call(l,u.key)&&(u.type==="text"?i.admin.sections[c].values[u.key]=String(l[u.key]||"").trim():i.admin.sections[c].values[u.key]=v(l[u.key]))})}),i.admin.sections.csc.values=de(a==null?void 0:a.csc),i.admin.sections.cano.values=Re(a==null?void 0:a.cano),i.admin.sections.detailing.values=ct(a==null?void 0:a.detailing),i.admin.sections.trojan.values.documentConditions=gn((o=a==null?void 0:a.trojan)==null?void 0:o.documentConditions);const r=$t(a==null?void 0:a.leadTimes);i.admin.sections.trojan.values.leadTimes=r.trojan,i.admin.sections.csc.values.leadTimes=r.csc,i.admin.sections.cano.values.leadTimes=r.cano}catch{}const e=localStorage.getItem(yi);if(e)try{const a=JSON.parse(e);i.admin.sections.detailing.values=ct({...i.admin.sections.detailing.values,buckets:a})}catch{}const n=localStorage.getItem(Ai);if(n!==null){const a=v(n);i.admin.sections.trojan.values.minimumProjectMargin=a}const s=localStorage.getItem(Ni);if(s)try{const a=JSON.parse(s);Array.isArray(a)&&(i.admin.changelog=a)}catch{}Ae=i.admin.sections.trojan.values.documentConditions.reduce((a,r)=>Math.max(a,Number.parseInt(String((r==null?void 0:r.id)??""),10)||0),0)+1}function $(){const t={projectName:i.projectName,projectLocation:i.projectLocation,projectComplexityTier:i.projectComplexityTier,submittalsLeadTime:i.submittalsLeadTime,fabricationLeadTime:i.fabricationLeadTime,takeoffByTrojan:i.takeoffByTrojan,cutListProvided:i.cutListProvided,specsReviewed:i.specsReviewed,milesFromTrojanFacility:i.milesFromTrojanFacility,scope:i.scope,deckSpecsCollapsed:i.deckSpecsCollapsed,deckReviewMode:i.deckReviewMode,joistReviewMode:i.joistReviewMode,deckFlags:{...i.deckFlags},deckFlagSelectionOrder:Array.isArray(i.deckFlagSelectionOrder)?[...i.deckFlagSelectionOrder]:[],deckProfiles:Array.isArray(i.deckProfiles)?i.deckProfiles.map(e=>({...e})):[],accessories:Array.isArray(i.accessories)?i.accessories.map(e=>({...e})):[],joists:{...i.joists},joistItems:Array.isArray(i.joistItems)?i.joistItems.map(e=>({...e})):[],takeoff:{...i.takeoff,areas:Array.isArray(i.takeoff.areas)?i.takeoff.areas.map(e=>({...e,deckLines:Array.isArray(e.deckLines)?e.deckLines.map(n=>({...n})):[],joistGroups:Array.isArray(e.joistGroups)?e.joistGroups.map(n=>({...n,marks:Array.isArray(n.marks)?n.marks.map(s=>({...s})):[]})):[]})):[]},pricingMargins:{...i.pricingMargins},pricingMarginOverrides:{...i.pricingMarginOverrides},pricingDetailing:{...i.pricingDetailing},appliedOptimizationSelection:{...i.appliedOptimizationSelection},pricingSections:{...i.pricingSections},currentPage:i.currentPage};try{localStorage.setItem(mn,JSON.stringify(t))}catch{}}function fo(){try{const t=localStorage.getItem(mn);if(!t)return;const e=JSON.parse(t);if(!e||typeof e!="object")return;i.projectName=String(e.projectName??i.projectName),i.projectLocation=String(e.projectLocation??i.projectLocation),i.projectComplexityTier=String(e.projectComplexityTier??i.projectComplexityTier),i.submittalsLeadTime=String(e.submittalsLeadTime??i.submittalsLeadTime),i.fabricationLeadTime=String(e.fabricationLeadTime??i.fabricationLeadTime),i.takeoffByTrojan=String(e.takeoffByTrojan??i.takeoffByTrojan).toUpperCase()==="NO"?"NO":"YES",i.cutListProvided=String(e.cutListProvided??i.cutListProvided).toUpperCase()==="YES"?"YES":"NO",i.specsReviewed=String(e.specsReviewed??i.specsReviewed).toUpperCase()==="YES"?"YES":"NO",i.milesFromTrojanFacility=String(e.milesFromTrojanFacility??i.milesFromTrojanFacility),i.scope="joist-deck",i.deckSpecsCollapsed=!!e.deckSpecsCollapsed,i.deckReviewMode=!!e.deckReviewMode,i.joistReviewMode=!!e.joistReviewMode,e.deckFlags&&typeof e.deckFlags=="object"&&(i.deckFlags={...i.deckFlags,...e.deckFlags}),Array.isArray(e.deckFlagSelectionOrder)&&(i.deckFlagSelectionOrder=[...e.deckFlagSelectionOrder]),Array.isArray(e.deckProfiles)&&(i.deckProfiles=e.deckProfiles.map(o=>({...Ge(),...o}))),Array.isArray(e.accessories)&&(i.accessories=e.accessories.map(o=>({...is(),...o}))),e.joists&&typeof e.joists=="object"&&(i.joists={...i.joists,...e.joists}),Array.isArray(e.joistItems)&&(i.joistItems=e.joistItems.map(o=>({...ss(),...o}))),e.takeoff&&typeof e.takeoff=="object"&&(i.takeoff={...i.takeoff,...e.takeoff,areas:Array.isArray(e.takeoff.areas)?e.takeoff.areas.map(o=>{const a=as();return{...a,id:Number(o==null?void 0:o.id)||a.id,name:String((o==null?void 0:o.name)||a.name),isCollapsed:!!(o!=null&&o.isCollapsed),deckLines:Array.isArray(o==null?void 0:o.deckLines)?o.deckLines.map(r=>{const c=os();return{...c,...r,specs:{...c.specs,...r!=null&&r.specs&&typeof r.specs=="object"?r.specs:{}}}}):[],joistGroups:Array.isArray(o==null?void 0:o.joistGroups)?o.joistGroups.map(r=>({...cn(),...r,marks:Array.isArray(r==null?void 0:r.marks)?r.marks.map(c=>({...rn(),...c})):[]})):Array.isArray(o==null?void 0:o.joistLines)?[{...cn(),isCollapsed:!1,marks:o.joistLines.map(r=>({...rn(),...r}))}]:[]}}):[]},!i.takeoff.projectLocation&&typeof e.takeoff.cityState=="string"&&(i.takeoff.projectLocation=e.takeoff.cityState)),e.pricingMargins&&typeof e.pricingMargins=="object"&&(i.pricingMargins={...i.pricingMargins,...e.pricingMargins}),e.pricingMarginOverrides&&typeof e.pricingMarginOverrides=="object"&&(i.pricingMarginOverrides={...i.pricingMarginOverrides,...e.pricingMarginOverrides}),e.pricingDetailing&&typeof e.pricingDetailing=="object"&&(i.pricingDetailing={...i.pricingDetailing,...e.pricingDetailing}),e.appliedOptimizationSelection&&typeof e.appliedOptimizationSelection=="object"&&(i.appliedOptimizationSelection={...i.appliedOptimizationSelection,...e.appliedOptimizationSelection}),e.pricingSections&&typeof e.pricingSections=="object"&&(i.pricingSections={...i.pricingSections,...e.pricingSections}),bn=i.deckProfiles.reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1,kn=i.accessories.reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1,Cn=i.joistItems.reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1;const n=Array.isArray(i.takeoff.areas)?i.takeoff.areas:[];ue=n.flatMap(o=>[...Array.isArray(o.deckLines)?o.deckLines:[],...(Array.isArray(o.joistGroups)?o.joistGroups:[]).flatMap(a=>[a,...Array.isArray(a==null?void 0:a.marks)?a.marks:[]])]).reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1,Sn=n.reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1,i.takeoff.nextAreaNumber=Math.max(m(i.takeoff.nextAreaNumber)||1,n.length+1)}catch{}}function qi(){localStorage.removeItem(mn),localStorage.removeItem(Gi)}function bo(){ot&&(window.clearTimeout(ot),ot=null),i.projectName="",i.projectLocation="",i.projectComplexityTier="2",i.submittalsLeadTime="",i.fabricationLeadTime="",i.takeoffByTrojan="YES",i.cutListProvided="NO",i.specsReviewed="NO",i.milesFromTrojanFacility="",i.scope="joist-deck",i.adminReturnPage="project",i.deckSpecsCollapsed=!1,i.deckReviewMode=!1,i.joistReviewMode=!1,i.deckFlags={americanSteelRequired:!1,americanManufacturing:!1,sdiManufacturer:!1,specifiedManufacturer:!1,specifiedManufacturerName:""},i.deckFlagSelectionOrder=[],i.deckProfiles=[],i.accessories=[],i.joists={supplier:"CSC",tons:""},i.joistItems=[],i.takeoff={bidNo:"",jobNumber:"",jobName:"",projectLocation:"",areas:[],nextAreaNumber:1},i.totals={joistsTotal:0,totalDeckSqs:0,deckTotal:0,totalDeckTons:0,trojanDeckTons:0,brokeredDeckTons:0,trojanShipping:0,trojanShippingTrucks:0,trojanShippingMiles:0,trojanShippingRate:0,grandTotal:0},i.pricingSections={trojanDeck:!0,brokeredDeck:!0,accessories:!1,joists:!0,detailing:!0},i.pricingOptimizationVisible=!1,i.pricingOptimizationLoading=!1,i.pricingOptimizationScenarios=[],i.appliedOptimizationSelection={deckMode:"auto",deckVendor:"",deckAssignments:[],joistVendor:"",label:""},i.pricingMargins={trojanDeck:15,brokeredDeck:5,joists:5},i.pricingMarginOverrides={trojanDeck:!1,brokeredDeck:!1,joists:!1},i.pricingDetailing={detailingPercentAuto:0,detailingPercentOverride:null,detailingAmount:0,subtotal:0,finalTotal:0},i.vendorPlan=null,bn=1,kn=1,Cn=1,ue=1,Sn=1}function zi(){bo(),Ne&&(Ne.value=""),re&&(re.value=""),yt&&(yt.value="2"),tt&&(tt.value=""),et&&(et.value=""),ht&&(ht.value="YES"),Gt&&(Gt.value="NO"),Lt&&(Lt.value="NO"),kt&&(kt.value=""),Et&&(Et.value=""),Nt&&(Nt.value=""),At&&(At.value=""),bt&&(bt.value=""),Bi.forEach(t=>{t.checked=!1}),ce&&(ce.value=i.joists.supplier),Tn(),F(),pt(),R(),St(),z(),I(),Z("project")}function x(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ko(t){if(!Array.isArray(t)||t.length===0)return[];const e=t.find(n=>n&&typeof n=="object");return e?Object.keys(e):[]}function Hi(t,e){return!Array.isArray(t)||!Array.isArray(e)?[]:t.filter(n=>n&&typeof n=="object").map(n=>{const s={};return e.forEach(o=>{s[o]=String(n[o]??"").trim()}),s}).filter(n=>e.some(s=>n[s]!==""))}function Co(t){const e=t.map(a=>({key:a,text:String(a||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()})),n=e.find(a=>a.text==="name"||a.text==="supplier name");if(n)return n.key;const s=e.find(a=>a.text.includes("name"));if(s)return s.key;const o=e.find(a=>a.text.includes("supplier"));return o?o.key:""}function Te(t){gi&&(gi.textContent=t)}function So(t,e,n){for(let s=0;s<t.length;s+=1){const o=t[s];if(e.every(r=>String(o[r]||"").trim()===""))return{isValid:!1,message:`Row ${s+1} cannot be blank.`};if(n&&String(o[n]||"").trim()==="")return{isValid:!1,message:`Row ${s+1} is missing ${n}.`}}return{isValid:!0,message:""}}function vo(t){i.suppliers.isEditing=t,xt==null||xt.classList.toggle("hidden",t),Jt==null||Jt.classList.toggle("hidden",!t),_t==null||_t.classList.toggle("hidden",!t),Vt==null||Vt.classList.toggle("hidden",!t)}function To(){if(!at)return;const t=i.suppliers.columns,e=i.suppliers.isEditing?i.suppliers.draftRows:i.suppliers.rows;if(!i.suppliers.isLoaded&&i.suppliers.isLoading){at.innerHTML="";return}if(t.length===0){at.innerHTML='<p class="help-text">No supplier data available.</p>';return}const n=t.map(a=>`<th>${x(a)}</th>`).join(""),s=i.suppliers.isEditing?"<th>Actions</th>":"",o=e.map((a,r)=>{const c=t.map(l=>{const u=String(a[l]??"");return i.suppliers.isEditing?`<td><input type="text" data-suppliers-row="${r}" data-suppliers-column="${x(l)}" value="${x(u)}" /></td>`:`<td>${x(u)}</td>`}).join(""),d=i.suppliers.isEditing?`<td><button type="button" class="btn-secondary suppliers-delete-row-button" data-suppliers-delete-row="${r}">Delete</button></td>`:"";return`<tr>${c}${d}</tr>`}).join("");at.innerHTML=`
    <div class="suppliers-table-scroll">
      <table class="suppliers-table">
        <thead>
          <tr>${n}${s}</tr>
        </thead>
        <tbody>${o}</tbody>
      </table>
    </div>
  `}function Ct(){if(vo(i.suppliers.isEditing),i.suppliers.loadError)Te(i.suppliers.loadError);else if(!i.suppliers.isLoaded&&i.suppliers.isLoading)Te("Loading suppliers...");else{const t=i.suppliers.rows.length;Te(`${t} row${t===1?"":"s"} loaded.`)}To()}async function Ki(){if(!(i.suppliers.isLoaded||i.suppliers.isLoading)){i.suppliers.isLoading=!0,i.suppliers.loadError="",Ct();try{let t=[],e=!1,n=null;try{n=localStorage.getItem(hi)}catch{n=null}if(n)try{const a=JSON.parse(n);Array.isArray(a)&&(t=a,e=!0)}catch{}if(!e)try{const a=await fetch("data/suppliers.json",{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const r=await a.json();Array.isArray(r)&&(t=r)}catch{i.suppliers.loadError="Unable to load suppliers data."}const s=ko(t),o=Hi(t,s);i.suppliers.columns=s,i.suppliers.rows=o,i.suppliers.draftRows=o.map(a=>({...a})),i.suppliers.nameColumnKey=Co(s),i.suppliers.isLoaded=!0,i.suppliers.isEditing=!1}finally{i.suppliers.isLoading=!1,Ct()}}}function Wi(t,e,n){let s=String(t||"").trim();const o=String(e||"").trim().replace(/ /g,""),a=String(n||"").trim();return s.endsWith(".0")&&(s=s.slice(0,-2)),`${s}${o}${a}`.toUpperCase()}function Ue(){return["project","deck","joist","pricing"]}function Tn(){const t=i.projectName.trim();xs.textContent=t===""?"PROJECT":t.toUpperCase()}function Ht(t){return String(t||"").trim().toUpperCase()}function Eo(){return i.deckProfiles.some(t=>Ht(t.specs.manufacturer)==="TROJAN")}function No(){return Eo()}function Ao(){const t=[];return i.projectName.trim()===""&&t.push("MISSING: PROJECT NAME"),i.projectLocation.trim()===""&&t.push("MISSING: PROJECT LOCATION"),No()&&m(i.milesFromTrojanFacility)<=0&&t.push("MISSING: MILES FROM TROJAN FACILITY"),t}function yo(){const t=[];return i.deckProfiles.length===0?(t.push("MISSING: AT LEAST 1 DECK PROFILE"),t):(i.deckProfiles.forEach((e,n)=>{const s=n+1;["depth","profile","gage","finish","grade"].forEach(o=>{(e.specs[o]||"")===""&&t.push(`MISSING: DECK PROFILE #${s}: ${o.toUpperCase()}`)}),e.rowSqs<=0&&t.push(`MISSING: DECK PROFILE #${s}: TOTAL PROFILE SQS`),e.requiresOverride&&m(e.overrideTons)<=0&&t.push(`MISSING: DECK PROFILE #${s}: OVERRIDE TONS`)}),t)}function ho(){const t=[];return(i.joists.supplier||"").trim()===""&&t.push("MISSING: SUPPLIER"),i.joistItems.length===0&&t.push("MISSING: AT LEAST 1 JOIST"),m(i.joists.tons)<=0&&t.push("MISSING: JOIST TONS"),t}function Wt(){return Ao().length===0}function Go(){return yo().length===0}function Yi(){return ho().length===0}function ee(t){i.milesFromTrojanFacility=t,kt&&(kt.value=t),I()}function Lo(t={}){const{force:e=!1}=t,n=String(i.admin.sections.trojan.values.facilityAddress||"").trim(),s=String(i.projectLocation||"").trim();if(n===""||s===""){Dt="",ee("");return}const o=`${n}::${s}`;!e&&o===Dt||(Dt=o,Qi().then(a=>{var d,l;if(!a||!((l=(d=window.google)==null?void 0:d.maps)!=null&&l.DistanceMatrixService)){Dt="",ee("");return}const r=++bi;new window.google.maps.DistanceMatrixService().getDistanceMatrix({origins:[n],destinations:[s],travelMode:window.google.maps.TravelMode.DRIVING,unitSystem:window.google.maps.UnitSystem.IMPERIAL},(u,p)=>{var T,E,S,C;if(r!==bi)return;if(p!=="OK"){Dt="",ee("");return}const g=(S=(E=(T=u==null?void 0:u.rows)==null?void 0:T[0])==null?void 0:E.elements)==null?void 0:S[0],f=(C=g==null?void 0:g.distance)==null?void 0:C.value;if((g==null?void 0:g.status)!=="OK"||!Number.isFinite(f)||f<=0){Dt="",ee("");return}const k=f/1609.344;ee(k.toFixed(1))})}))}function pe(t={}){const{force:e=!1}=t;clearTimeout(fi),fi=setTimeout(()=>{Lo({force:e})},500)}function Qi(){var e,n;if(ke)return Promise.resolve(!0);if(Ce)return Ce;const t=typeof window<"u"&&typeof window[Un]=="string"?window[Un].trim():"";return t===""?(console.warn("GOOGLE_MAPS_API_KEY is not set. Address autocomplete is disabled."),Promise.resolve(!1)):(n=(e=window.google)==null?void 0:e.maps)!=null&&n.places?(ke=!0,Promise.resolve(!0)):(Ce=new Promise(s=>{const o=document.createElement("script");o.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(t)}&libraries=places`,o.async=!0,o.defer=!0,o.onload=()=>{var a,r;ke=!!((r=(a=window.google)==null?void 0:a.maps)!=null&&r.places),s(ke)},o.onerror=()=>s(!1),document.head.appendChild(o)}),Ce)}function Xi(t){document.querySelectorAll(".pac-container").forEach(n=>{n.style.display=t?"":"none"})}function jo(t){if(!t||t.dataset.pacFixBound==="true")return;const e=()=>Xi(!0);t.addEventListener("focus",e),t.addEventListener("click",e),t.addEventListener("input",e),t.dataset.pacFixBound="true"}function nn(t){var n,s;if(!t||(jo(t),t.dataset.gmapsBound==="true")||!((s=(n=window.google)==null?void 0:n.maps)!=null&&s.places))return;const e=new window.google.maps.places.Autocomplete(t,{types:["geocode"],fields:["formatted_address"]});e.addListener("place_changed",()=>{const o=e.getPlace();o!=null&&o.formatted_address&&(t.value=o.formatted_address),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),setTimeout(()=>{t.blur(),Xi(!1)},20)}),po.set(t,{inputElement:t,autocomplete:e}),t.dataset.gmapsBound="true"}function Io(){Qi().then(t=>{if(!t)return;nn(re),nn(bt),nt.querySelectorAll('[data-admin-type="text"]').forEach(n=>nn(n))})}function Z(t){const e=Ue();let n=t;n!=="admin"&&n!=="suppliers"&&!e.includes(n)&&(n="project"),n==="admin"&&i.currentPage!=="admin"&&(i.adminReturnPage=i.currentPage),i.currentPage=n,ws.classList.toggle("hidden",n!=="project"),P==null||P.classList.toggle("hidden",n!=="takeoff"),Ri.classList.toggle("hidden",n!=="deck"),Bs.classList.toggle("hidden",n!=="joist"),le.classList.toggle("hidden",n!=="pricing"),Rt==null||Rt.classList.toggle("hidden",n!=="admin"),qe==null||qe.classList.toggle("hidden",n!=="suppliers"),Ut==null||Ut.classList.toggle("hidden",n==="admin"||n==="suppliers"),wt==null||wt.classList.toggle("hidden",n==="admin"||n==="suppliers"),n==="pricing"&&(i.pricingSections.trojanDeck=!0,i.pricingSections.accessories=!0,i.pricingSections.brokeredDeck=!0,i.pricingSections.joists=!0,i.pricingSections.detailing=!0,pe(),Pt()),n==="suppliers"&&Ki(),n==="takeoff"&&R(),z(),Oo()}function Oo(){Bn.length&&Bn.forEach(t=>{const e=String(t.getAttribute("data-main-tab")||"").trim(),n=i.currentPage===e;t.classList.toggle("is-active",n),t.classList.remove("is-disabled"),t.disabled=!1,t.setAttribute("aria-current",n?"page":"false")})}function Zi(){i.adminReturnPage="admin",Z("suppliers")}function En(){const t=Ue(),e=t.indexOf(i.currentPage);e===-1||e===t.length-1||Z(t[e+1])}function Nn(){const t=Ue(),e=t.indexOf(i.currentPage);e<=0||Z(t[e-1])}function z(){Ui.disabled=!1,i.scope==="deck-only"?Se.textContent="NEXT: PRICING":Se.textContent="NEXT: JOIST",Se.classList.toggle("hidden",!i.deckReviewMode),Fi.classList.toggle("hidden",!i.joistReviewMode)}function An(t){const e=m(t);return e<=0?0:Math.ceil(e)}function ts(t,e,n=null){var l,u,p,g;const s=n||mt(),o=String(t||"").trim().toUpperCase(),r=(o==="DECK"?((u=(l=s.csc)==null?void 0:l.deck)==null?void 0:u.buckets)||[]:o==="JOISTS"?((g=(p=s.csc)==null?void 0:p.joists)==null?void 0:g.buckets)||[]:[]).map(f=>({start:v(f.start),end:v(f.end),cost:v(f.cost)}));if(r.length===0)return null;const c=An(e);let d=r.find(f=>c>=f.start&&c<=f.end);return d||(d=[...r].sort((f,k)=>k.end-f.end)[0]),d?{...d,bucketTons:c}:null}function Yt({vendor:t,scope:e,tons:n,adminPricing:s=null}){var l;const o=String(t).trim().toUpperCase(),a=String(e||"").trim().toUpperCase(),r=m(n),c=s||mt(),d=An(r);if(r<=0)return{pricePerTon:0,rawTons:r,bucketTons:d,bucketStart:null,bucketEnd:null};if(o==="CSC"&&(a==="DECK"||a==="JOISTS")){const u=ts(a,r,c);return{pricePerTon:u?v(u.cost):0,rawTons:r,bucketTons:d,bucketStart:u?u.start:null,bucketEnd:u?u.end:null}}if(o==="CANO"&&(a==="DECK"||a==="JOISTS")){const u=v((l=c.cano)==null?void 0:l.perLb);return{pricePerTon:u>0?u*2e3:0,rawTons:r,bucketTons:d,bucketStart:null,bucketEnd:null}}if(o==="TROJAN"&&a==="DECK"){const u=c.trojan||{},p=v(u.coilCostPerLb)+v(u.inboundFreightPerLb)+v(u.laborPerLb);return{pricePerTon:p>0?p*2e3:0,rawTons:r,bucketTons:d,bucketStart:null,bucketEnd:null}}return{pricePerTon:0,rawTons:r,bucketTons:d,bucketStart:null,bucketEnd:null}}function Po(t){const e=ts("JOISTS",t);return e?{start:e.start,end:e.end,cost:e.cost,bucketTons:e.bucketTons}:null}function $o(t){const n=String(t||"").trim().toUpperCase().match(/,\s*([A-Z]{2})(?:\s+\d{5}(?:-\d{4})?)?\s*$/);return n?n[1]:""}function ne(t){return String(t||"").trim().toUpperCase()==="TRUE"}function Do(t){return String(t||"").split(",").map(e=>e.trim()).filter(Boolean).map(e=>Number.parseFloat(e)).filter(e=>Number.isFinite(e))}function Kt(t){return String(t||"").toUpperCase().replace(/[^A-Z0-9]+/g,"")}function lt(t,e){if(!t||typeof t!="object")return;const n=new Set(e.map(o=>Kt(o))),s=Object.entries(t);for(let o=0;o<s.length;o+=1){const[a,r]=s[o];if(n.has(Kt(a)))return r}}function Qt(t){const e=String(lt(t,["SUPPLIER","supplier","NAME"])||"").trim().toUpperCase(),n=Number.parseInt(String(lt(t,["PRIORITY","priority"])??""),10),s=String(lt(t,["DECK LOCATION","deckLocation"])||"").trim().toUpperCase(),o=new Set(["SUPPLIER","DECK","DEPTH","JOISTS","AMERICAN STEEL REQUIRED","AMERICAN MANUFACTURING","SDI MANUFACTURING","SDI MANUFACTURER","PRIORITY","JOIST LOCATION","DECK LOCATION"].map(r=>Kt(r))),a={};return Object.entries(t||{}).forEach(([r,c])=>{const d=Kt(r);if(!d||o.has(d))return;const l=String(c||"").trim().toUpperCase();(l==="TRUE"||l==="FALSE")&&(a[d]=l==="TRUE")}),{supplier:e,deck:ne(lt(t,["DECK"])),joists:ne(lt(t,["JOISTS"])),depths:Do(lt(t,["DEPTH"])),americanSteelRequired:ne(lt(t,["AMERICAN STEEL REQUIRED"])),americanManufacturing:ne(lt(t,["AMERICAN MANUFACTURING"])),sdiManufacturing:ne(lt(t,["SDI MANUFACTURING","SDI MANUFACTURER"])),priority:Number.isFinite(n)?n:Number.MAX_SAFE_INTEGER,deckLocation:s,profileAvailability:a}}function ye(){return Array.isArray(i.suppliers.rows)&&i.suppliers.rows.length>0&&i.suppliers.rows.map(n=>Qt(n)).filter(n=>n.supplier!=="").some(n=>n.deck&&n.depths.length>0&&n.priority<Number.MAX_SAFE_INTEGER)?i.suppliers.rows:Pi}function Mo(t){const e=Ht(t);return e?q.manufacturer.find(s=>Ht(s)===e)||t:""}function Ot(t,e,n){var a;if(t==="TROJAN"){const r=n.trojan||{},c=v(r.coilCostPerLb)+v(r.inboundFreightPerLb)+v(r.laborPerLb);return c>0?c*2e3:0}if(t==="CSC")return Yt({vendor:"CSC",scope:"DECK",tons:e,adminPricing:n}).pricePerTon;if(t==="CANO"){const r=v((a=n.cano)==null?void 0:a.perLb);return r>0?r*2e3:0}const s=Ot("CSC",e,n),o={"CUTTING EDGE":1,CORDECK:1.03,CSM:1.05,HOUSTONBDECK:1.08}[t]||1.08;return s>0?s*o:0}function Ro(t,e,n){var s;if(t==="CSC")return Yt({vendor:"CSC",scope:"JOISTS",tons:e,adminPricing:n}).pricePerTon;if(t==="CANO"){const o=v((s=n.cano)==null?void 0:s.perLb);return o>0?o*2e3:0}return 0}function he(t,e){var s;if(!t||e.sdiManufacturer)return!1;const n=String(((s=t.specs)==null?void 0:s.depth)||"").trim();return!(n!=="1.5"&&n!=="2.0")}function Uo(t,e){return!(t==="CANO"&&(e.americanSteelRequired||e.americanManufacturing)||t==="TROJAN"&&e.sdiManufacturer)}function es(t,e){var Q,it,st;const n=t.deckFlags||{},s=t.deckLines||[],o=t.scope||"",a=o==="joists-only"||o==="joist-deck",r=o==="deck-only",c=$o(t.projectLocation),d=Array.isArray(t.supplierRules)?t.supplierRules.map(Qt).filter(N=>N.supplier!==""):[],l=["CSC","CANO"].filter(N=>Uo(N,n)),u=d.filter(N=>N.joists&&l.includes(N.supplier)&&N.priority<Number.MAX_SAFE_INTEGER);function p(N){return[...N].sort((O,A)=>{if(O.priority!==A.priority)return O.priority-A.priority;const B=O.deckLocation!==""&&O.deckLocation===c?1:0,H=A.deckLocation!==""&&A.deckLocation===c?1:0;return B!==H?H-B:O.supplier.localeCompare(A.supplier)})}let g=a?((Q=p(u)[0])==null?void 0:Q.supplier)||"CSC":null;const f=[],k=["CUTTING EDGE","CORDECK","CSM","HOUSTONBDECK"];function T(N){var H,K;if(!N)return[];const O=Number.parseFloat(String(((H=N.specs)==null?void 0:H.depth)||"").trim());if(!Number.isFinite(O))return[];const A=Kt(String(((K=N.specs)==null?void 0:K.profile)||"").trim());return d.filter(_=>!(!_.deck||n.americanSteelRequired&&!_.americanSteelRequired||n.americanManufacturing&&!_.americanManufacturing||n.sdiManufacturer&&!_.sdiManufacturing)).filter(_=>_.depths.some(fe=>Math.abs(fe-O)<1e-4)?!A||!_.profileAvailability||!Object.prototype.hasOwnProperty.call(_.profileAvailability,A)?!0:!!_.profileAvailability[A]:!1)}function E(N){return[...N].sort((O,A)=>{if(O.priority!==A.priority)return O.priority-A.priority;const B=O.deckLocation!==""&&O.deckLocation===c?1:0,H=A.deckLocation!==""&&A.deckLocation===c?1:0;return B!==H?H-B:O.supplier.localeCompare(A.supplier)})}s.forEach((N,O)=>{var On,Pn,$n;const A=m(N.rowTons),B=String(((On=N==null?void 0:N.specs)==null?void 0:On.depth)||"").trim(),H=String(((Pn=N==null?void 0:N.specs)==null?void 0:Pn.profile)||"").trim();let K=null,_="";const Zt=T(N),fe=String(n.specifiedManufacturerName||"").trim().toUpperCase();if(!K){const ft=B==="1.5"||B==="2.0",Ve=!n.sdiManufacturer;ft&&Ve&&(K="TROJAN",_="Trojan preferred for 1.5/2.0 depth")}if(!K&&n.specifiedManufacturer&&fe&&H&&Zt.length>0){const ft=Zt.find(Ve=>Ve.supplier===fe);ft&&(K=ft.supplier,_="Specified manufacturer override")}if(!K&&Zt.length>0){const ft=E(Zt);K=ft[0].supplier,_=`Supplier rules priority ${ft[0].priority}`}K||(K=(r?k:[...l,...k])[0]||"CSC",_="Fallback vendor (no supplier rule match)");const In=Ot(K,A,e);f.push({lineId:N.id,lineIndex:O,profile:N.profileName||(($n=N.specs)==null?void 0:$n.profile)||"",sqs:m(N.rowSqs),vendor:K,reason:_,tons:A,pricePerTon:In,extendedTotal:A*In})});const S=f.filter(N=>N.vendor==="TROJAN").reduce((N,O)=>N+O.tons,0),C=f.filter(N=>N.vendor!=="TROJAN").reduce((N,O)=>N+O.tons,0);if(a){const N=new Set(f.map(A=>String(A.vendor||"").trim().toUpperCase())),O=u.filter(A=>N.has(A.supplier));O.length>0?g=p(O)[0].supplier:u.length>0&&(g=p(u)[0].supplier)}const b={};f.filter(N=>N.tons>0).forEach(N=>{b[N.vendor]||(b[N.vendor]={vendor:N.vendor,tons:0,pricePerTon:N.pricePerTon,extendedTotal:0}),b[N.vendor].tons+=N.tons,b[N.vendor].extendedTotal+=N.extendedTotal});const y=Object.values(b).filter(N=>N.vendor==="TROJAN"),L=Object.values(b).filter(N=>N.vendor!=="TROJAN"),j=m(t.joistTons),w=g?Ro(g,j,e):0,X=g==="CSC"&&j>0&&j<=9?v((st=(it=e.csc)==null?void 0:it.joists)==null?void 0:st.extraShippingFee_0_9):0;return{deckAssignments:f,rollups:{trojanDeckTons:S,brokeredDeckTons:C},chosenJoistVendor:g,joistPricePerTon:w,joistExtraShippingFee:X,pricingSchedule:{trojanDeck:y,trojanDeckLines:f.filter(N=>N.vendor==="TROJAN"),brokeredDeck:L,joists:g?{vendor:g,tons:j,pricePerTon:w,extraShippingFee:X,total:j*w+X}:null}}}function wo(){const t={trojan:{coilCostPerLb:.45,inboundFreightPerLb:.05,laborPerLb:.12},csc:de(Ee()),cano:{perLb:1.89}};return[{name:"SDI blocks Trojan",input:{scope:"deck-only",projectLocation:"Dallas, TX",deckFlags:{sdiManufacturer:!0,americanSteelRequired:!1,americanManufacturing:!1},deckLines:[{id:1,specs:{depth:"1.5",profile:"NIA-24"},rowTons:12}],joistTons:0}},{name:"Depth 3.0 blocks Trojan",input:{scope:"deck-only",projectLocation:"Austin, TX",deckFlags:{sdiManufacturer:!1,americanSteelRequired:!1,americanManufacturing:!1},deckLines:[{id:2,specs:{depth:"3.0",profile:"NP-32"},rowTons:8}],joistTons:0}}].map(n=>({name:n.name,result:es(n.input,t)}))}function ns(){return{sqs:"",sqft:"",lf:"",lfWidthIn:"",pcs:"",cutWidthIn:"",lengthFt:"",inches:""}}function Ge(){return{id:bn++,specs:{depth:"",manufacturer:"",profile:"",gage:"",finish:"",paintTop:"",paintBottom:"",grade:""},manufacturerExplicit:!1,method:"SQS",inputs:ns(),overrideTons:"",rowSqFt:0,rowSqs:0,rowTons:0,tonsFromOverride:!1,requiresOverride:!1,showOverride:!0,showWeightWarning:!1,missingLookupMessage:"",lastWarnSignature:"",weightStatus:"INCOMPLETE",isCollapsed:!1}}function is(){return{id:kn++,type:"",screwCount:null,tons:null,isCollapsed:!1}}function Bo(t){t&&(t.specs.depth="1.5",t.specs.profile="B",t.specs.gage="20",t.specs.finish="G60",t.specs.grade="50",t.specs.manufacturer="",t.manufacturerExplicit=!1,ln(t))}function ss(){return{id:Cn++,series:"",units:"",tons:"",isCollapsed:!1}}function os(){return{id:ue++,specs:{depth:"",profile:"",gage:"",finish:"",grade:"",paintTop:"",paintBottom:""},squares:"",isCollapsed:!1}}function as(){const t=m(i.takeoff.nextAreaNumber)||1;return i.takeoff.nextAreaNumber=t+1,{id:Sn++,name:`TO AREA #${t}`,isCollapsed:!1,deckSectionCollapsed:!1,joistSectionCollapsed:!1,deckLines:[],joistGroups:[],quickLineId:null}}function rn(){return{id:ue++,mark:"",qty:"",type:"",designation:"",uplift:"",oaLengthFt:"",oaLengthIn:""}}function cn(){return{id:ue++,isCollapsed:!1,marks:[]}}function V(t){return i.takeoff.areas.find(e=>Number(e.id)===Number(t))}function yn(){Array.isArray(i.takeoff.areas)||(i.takeoff.areas=[]),i.takeoff.areas.forEach((t,e)=>{t.name=`TOA${e+1}`}),i.takeoff.nextAreaNumber=i.takeoff.areas.length+1}function Ci(t){i.takeoff.areas.forEach(e=>{e.isCollapsed=Number(e.id)!==Number(t)})}function rs(t){var r,c,d,l,u;const e=Wi((r=t==null?void 0:t.specs)==null?void 0:r.depth,(c=t==null?void 0:t.specs)==null?void 0:c.profile,(d=t==null?void 0:t.specs)==null?void 0:d.gage),n=String(((l=t==null?void 0:t.specs)==null?void 0:l.finish)||"").trim().toUpperCase(),s=Number(((u=ve==null?void 0:ve[e])==null?void 0:u[n])||0),o=m(t==null?void 0:t.squares),a=s>0?o*s/2e3:0;return{lbsPerSquare:s,tons:a}}function Fo(t,e){if(!t||!t.specs)return;const n=String(e||"").trim().toUpperCase();if(n==="1.5B20G60GR50"){t.specs.depth="1.5",t.specs.profile="B",t.specs.gage="20",t.specs.finish="G60",t.specs.grade="50";return}if(n==="1.5B22G60GR50"){t.specs.depth="1.5",t.specs.profile="B",t.specs.gage="22",t.specs.finish="G60",t.specs.grade="50";return}n==="2.0VLI20G60GR50"&&(t.specs.depth="2.0",t.specs.profile="VLI",t.specs.gage="20",t.specs.finish="G60",t.specs.grade="50")}function xo(t,e,n){const s=rs(e),a=[e.specs.depth,e.specs.profile,e.specs.gage,e.specs.finish,e.specs.grade].filter(r=>String(r||"").trim()!=="").join(" ")||"DECK PROFILE";return`
    <div class="takeoff-deck-accordion" data-takeoff-area-id="${t.id}" data-takeoff-line-id="${e.id}">
      <div class="takeoff-deck-header" data-action="toggle-takeoff-deck-line" role="button" tabindex="0" aria-expanded="${!e.isCollapsed}">
        <span class="deck-summary-toggle" aria-hidden="true">${e.isCollapsed?"+":"−"}</span>
        <span class="deck-summary-name">${x(a)}</span>
        <span class="deck-summary-divider" aria-hidden="true">|</span>
        <span class="deck-summary-sqs">SQS: ${G(m(e.squares))}</span>
        <span class="deck-summary-divider" aria-hidden="true">|</span>
        <span class="deck-summary-tons">TONS: ${G(s.tons)}</span>
      </div>
      ${e.isCollapsed?"":`<div class="takeoff-deck-row">
        ${n?`<div class="takeoff-deck-row-presets">
          <button type="button" class="takeoff-quick-btn" data-action="takeoff-quick-profile" data-preset="1.5B20G60Gr50">1.5B20G60Gr50</button>
          <button type="button" class="takeoff-quick-btn" data-action="takeoff-quick-profile" data-preset="1.5B22G60Gr50">1.5B22G60Gr50</button>
          <button type="button" class="takeoff-quick-btn" data-action="takeoff-quick-profile" data-preset="2.0VLI20G60Gr50">2.0VLI20G60Gr50</button>
        </div>`:""}
        <div class="takeoff-deck-specs-grid">
          <div class="field-group"><label>Depth</label><select data-takeoff-field="depth">${J([{value:"",label:""},...q.depth],e.specs.depth)}</select></div>
          <div class="field-group"><label>Profile</label><select data-takeoff-field="profile">${J([{value:"",label:""},...q.profile],e.specs.profile)}</select></div>
          <div class="field-group"><label>Gage</label><select data-takeoff-field="gage">${J([{value:"",label:""},...q.gage],e.specs.gage)}</select></div>
          <div class="field-group"><label>Finish</label><select data-takeoff-field="finish">${J([{value:"",label:""},...q.finish],e.specs.finish)}</select></div>
          <div class="field-group"><label>Grade</label><select data-takeoff-field="grade">${J([{value:"",label:""},...q.grade],e.specs.grade)}</select></div>
          <div class="field-group"><label>Paint Top</label><select data-takeoff-field="paintTop">${J([{value:"",label:""},...q.paintTop],e.specs.paintTop)}</select></div>
          <div class="field-group"><label>Paint Bottom</label><select data-takeoff-field="paintBottom">${J([{value:"",label:""},...q.paintBottom],e.specs.paintBottom)}</select></div>
          <div class="field-group"><label>SQS</label><input data-takeoff-field="squares" type="number" min="0" step="0.01" value="${x(e.squares)}" /></div>
          <div class="field-group"><label>Tons</label><input type="text" readonly value="${G(s.tons)}" /></div>
          <button type="button" class="takeoff-remove-btn" data-action="takeoff-remove-deck-line" aria-label="Remove deck line">&times;</button>
        </div>
      </div>
      `}
    </div>
  `}function Jo(t,e,n){return`
    <div class="takeoff-joist-row" data-takeoff-area-id="${t.id}" data-takeoff-group-id="${e.id}" data-takeoff-line-id="${n.id}" data-takeoff-kind="joist">
      <div class="field-group"><label>Mark</label><input data-takeoff-field="mark" type="text" value="${x(n.mark)}" /></div>
      <div class="field-group"><label>Qty</label><input data-takeoff-field="qty" type="number" min="0" step="1" value="${x(n.qty)}" /></div>
      <div class="field-group"><label>Type</label><select data-takeoff-field="type">${J([{value:"",label:""},..._i],n.type)}</select></div>
      <div class="field-group"><label>Designation</label><input data-takeoff-field="designation" type="text" value="${x(n.designation)}" /></div>
      <div class="field-group"><label>Uplift</label><input data-takeoff-field="uplift" type="text" value="${x(n.uplift)}" /></div>
      <div class="field-group"><label>OA Length Ft</label><input data-takeoff-field="oaLengthFt" type="number" min="0" step="1" value="${x(n.oaLengthFt)}" /></div>
      <div class="field-group"><label>OA Length In</label><input data-takeoff-field="oaLengthIn" type="number" min="0" step="1" value="${x(n.oaLengthIn)}" /></div>
      <button type="button" class="takeoff-remove-btn" data-action="takeoff-remove-joist-line" aria-label="Remove joist line">&times;</button>
    </div>
  `}function R(){if(!P||!He)return;if(yn(),!Array.isArray(i.takeoff.areas)||i.takeoff.areas.length===0){He.innerHTML='<p class="takeoff-empty">No takeoff areas yet.</p>',Tt&&Tt.classList.add("hidden");return}He.innerHTML=i.takeoff.areas.map((e,n)=>{const s=e.deckLines.reduce((d,l)=>d+rs(l).tons,0),o=!!e.isCollapsed,a=`TOA${n+1}`,r=!!e.deckSectionCollapsed,c=!!e.joistSectionCollapsed;return`
        <section class="takeoff-area-accordion" data-takeoff-area-id="${e.id}">
          <div class="takeoff-area-header" data-action="toggle-takeoff-area" role="button" tabindex="0" aria-expanded="${!o}">
            <span class="deck-summary-toggle" aria-hidden="true">${o?"+":"−"}</span>
            <span class="deck-summary-name">${x(a)}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-tons">TONS: ${G(s)}</span>
            <button type="button" class="takeoff-area-remove-btn" data-action="takeoff-remove-area" aria-label="Remove ${x(a)}">&times;</button>
          </div>
          ${o?"":`<div class="takeoff-area-content">
                <div class="takeoff-subsection" data-takeoff-area-id="${e.id}" data-takeoff-subsection="deck">
                  <div class="takeoff-subsection-header" data-action="toggle-takeoff-deck-section" role="button" tabindex="0" aria-expanded="${!r}">
                    <span class="deck-summary-toggle" aria-hidden="true">${r?"+":"−"}</span>
                    <span class="deck-summary-name">DECK ${x(a)}</span>
                  </div>
                  ${r?"":`<div class="takeoff-subsection-content">
                        <div class="takeoff-deck-list">
                          ${e.deckLines.length>0?e.deckLines.map((d,l)=>{var g;const u=(g=e.deckLines[e.deckLines.length-1])==null?void 0:g.id,p=Number(e.quickLineId)||Number(u);return xo(e,d,Number(d.id)===Number(p)||l===e.deckLines.length-1&&!e.quickLineId)}).join(""):""}
                        </div>
                        <div class="takeoff-actions-row takeoff-line-actions">
                          <button type="button" class="btn-secondary" data-action="takeoff-add-deck">+ ADD DECK</button>
                        </div>
                      </div>`}
                </div>
                <div class="takeoff-subsection" data-takeoff-area-id="${e.id}" data-takeoff-subsection="joist">
                  <div class="takeoff-subsection-header" data-action="toggle-takeoff-joist-section" role="button" tabindex="0" aria-expanded="${!c}">
                    <span class="deck-summary-toggle" aria-hidden="true">${c?"+":"−"}</span>
                    <span class="deck-summary-name">JOIST ${x(a)}</span>
                  </div>
                  ${c?"":`<div class="takeoff-subsection-content">
                        <div class="takeoff-joist-list">
                          ${Array.isArray(e.joistGroups)&&e.joistGroups.length>0?e.joistGroups.map((d,l)=>{const u=Array.isArray(d.marks)?d.marks:[];return`
                                      <div class="takeoff-joist-group" data-takeoff-area-id="${e.id}" data-takeoff-group-id="${d.id}">
                                        <div class="takeoff-joist-group-header" data-action="toggle-takeoff-joist-group" role="button" tabindex="0" aria-expanded="${!d.isCollapsed}">
                                          <span class="deck-summary-toggle" aria-hidden="true">${d.isCollapsed?"+":"−"}</span>
                                          <span class="deck-summary-name">MARK ${l+1}</span>
                                          <button type="button" class="takeoff-mark-remove-btn" data-action="takeoff-remove-mark" aria-label="Remove MARK ${l+1}">&times;</button>
                                        </div>
                                        ${d.isCollapsed?"":`<div class="takeoff-joist-group-content">
                                              <div class="takeoff-joist-marks-list">
                                                ${u.length>0?u.map(p=>Jo(e,d,p)).join(""):""}
                                              </div>
                                            </div>`}
                                      </div>
                                    `}).join(""):""}
                        </div>
                        <div class="takeoff-actions-row takeoff-line-actions">
                          <button type="button" class="btn-secondary" data-action="takeoff-add-mark">+ ADD MARK</button>
                        </div>
                      </div>`}
                </div>
              </div>`}
        </section>
      `}).join("");const t=i.takeoff.areas.some(e=>(e.deckLines||[]).some(n=>{var s;return String(((s=n==null?void 0:n.specs)==null?void 0:s.profile)||"").trim()!==""}));Tt&&Tt.classList.toggle("hidden",!t)}function dn(t){return String(t||"").trim().toUpperCase()==="BRIDGING"}function we(t){return i.joistItems.find(e=>e.id===t)}function _o(t){i.joistItems.forEach(e=>{e.isCollapsed=e.id!==t})}function cs(t){const e=we(t);if(!e)return;const n=!e.isCollapsed;i.joistItems.forEach(s=>{s.isCollapsed=!0}),n||(e.isCollapsed=!1)}function Be(){const t=i.joistItems.reduce((e,n)=>e+m(n.tons),0);i.joists.tons=t>0?t.toFixed(2):""}function pt(){if(!W)return;if(i.joistItems.length===0){W.innerHTML='<p class="help-text">No joists added.</p>';return}const t=i.joistItems.map((e,n)=>{const s=e.isCollapsed?"+":"−",o=e.series||`Joist #${n+1}`,a=dn(e.series)?"":`<span class="deck-summary-divider" aria-hidden="true">|</span><span class="deck-summary-sqs">UNITS: ${Y(m(e.units))}</span>`,r=e.isCollapsed?"":`
        <div class="deck-row-content">
          <div class="deck-row-top">
            <p class="deck-row-title">Joist ${n+1}</p>
            <button type="button" class="btn-remove-row btn-remove-joist" aria-label="Remove joist ${n+1}">Remove</button>
          </div>
          <div class="joist-row-grid">
            <div class="field-group">
              <label>Series</label>
              <select data-group="joist" data-field="series">
                ${J([{value:"",label:""},..._i],e.series)}
              </select>
            </div>
            ${e.series===""||dn(e.series)?"":`<div class="field-group">
              <label>Units</label>
              <input type="number" min="0" step="1" inputmode="numeric" data-group="joist" data-field="units" value="${e.units}" />
            </div>`}
            ${e.series===""?"":`<div class="field-group">
              <label>Tons</label>
              <input type="number" min="0" step="0.01" inputmode="decimal" data-group="joist" data-field="tons" value="${e.tons}" />
            </div>`}
          </div>
        </div>
      `;return`
      <div class="deck-row" data-joist-id="${e.id}">
        <div class="deck-summary-row" data-joist-summary-id="${e.id}" role="button" tabindex="0" aria-expanded="${!e.isCollapsed}">
          <span class="deck-summary-toggle" aria-hidden="true">${s}</span>
          <span class="deck-summary-name">${x(o)}</span>
          ${a}
          <span class="deck-summary-divider" aria-hidden="true">|</span>
          <span class="deck-summary-tons">TONS: ${G(m(e.tons))}</span>
        </div>
        ${r}
      </div>
    `}).join("");W.innerHTML=t}function Vo(){if(te){if(!i.joistReviewMode||i.joistItems.length===0){te.classList.add("hidden"),te.innerHTML="";return}te.classList.remove("hidden"),te.innerHTML=`
    <div class="pricing-line-item">
      <div class="pricing-line-item-main">
        <span>TOTAL JOIST TONS</span>
        <strong>${G(m(i.joists.tons))}</strong>
      </div>
    </div>
  `}}function St(){if(!oe||!Ft)return;const t=i.joistItems.length>0;oe.classList.toggle("hidden",i.joistReviewMode),Ft.classList.toggle("hidden",!t),Ft.textContent=i.joistReviewMode?"EDIT":"REVIEW",Vo()}function Le(t){return t==="#10TEKSCREWS"||t==="#12TEKSCREWS"}function je(t){return t==="CC1"||t==="CC2"||t==="CC3"}function ds(t){if(t.manufacturerExplicit)return;const e=t.specs.depth==="1.5"||t.specs.depth==="2.0";if(e&&t.specs.manufacturer===""){t.specs.manufacturer="Trojan";return}!e&&t.specs.manufacturer==="Trojan"&&(t.specs.manufacturer="")}function Mt(t,e){return lo.includes(e)?(t.specs[e]||"")==="":!1}function ln(t){if(!t)return;const e=String(t.method||"").trim().toLowerCase().replace(/\s+/g,"");if(e!=="lf"&&e!=="cutlist")return;const n=String(t.specs.profile||"").trim().toUpperCase(),s=n.includes("-24")||n.endsWith("24")||n.includes(" 24"),o=n.includes("-32")||n.endsWith("32")||n.includes(" 32");let a=null;if(s?a="24":o&&(a="32"),!!a){if(e==="lf"){t.inputs.lfWidthIn=a;return}t.inputs.cutWidthIn=a}}function ls(t){if(!t)return Ge();const e=Ge();return e.specs.depth=t.specs.depth,e.specs.profile=t.specs.profile,e.specs.gage=t.specs.gage,e.specs.finish=t.specs.finish,e.specs.paintTop=t.specs.paintTop,e.specs.paintBottom=t.specs.paintBottom,e.specs.grade=t.specs.grade,t.specs.manufacturer!==""&&(e.specs.manufacturer=t.specs.manufacturer,e.manufacturerExplicit=!!t.manufacturerExplicit),ds(e),e}function se(t){i.deckProfiles.forEach(e=>{e.isCollapsed=e.id!==t})}function Si(t){i.accessories.forEach(e=>{e.isCollapsed=e.id!==t})}function us(t){const e=gt(t);if(!e)return;const n=!e.isCollapsed;i.deckProfiles.forEach(s=>{s.isCollapsed=!0}),n||(e.isCollapsed=!1)}function Fe(t){return i.accessories.find(e=>e.id===t)}function ps(t){const e=Fe(t);if(!e)return;const n=!e.isCollapsed;i.accessories.forEach(s=>{s.isCollapsed=!0}),n||(e.isCollapsed=!1)}function ms(t){const e=i.admin.sections[t];if(!e)return;const n=!e.isCollapsed;Object.keys(i.admin.sections).forEach(s=>{i.admin.sections[s].isCollapsed=!0}),n||(e.isCollapsed=!1)}function Ie(t){var o;const e=i.admin.sections.csc,n=(o=e==null?void 0:e.subsections)==null?void 0:o[t];if(!n)return;const s=!n.isCollapsed;Object.keys(e.subsections).forEach(a=>{e.subsections[a].isCollapsed=!0}),s||(n.isCollapsed=!1)}function Oe(t){var o;const e=i.admin.sections.trojan,n=(o=e==null?void 0:e.subsections)==null?void 0:o[t];if(!n)return;const s=!n.isCollapsed;Object.keys(e.subsections).forEach(a=>{e.subsections[a].isCollapsed=!0}),s||(n.isCollapsed=!1)}function gs(t){var o;const e=i.admin.sections.cano,n=(o=e==null?void 0:e.subsections)==null?void 0:o[t];if(!n)return;const s=!n.isCollapsed;Object.keys(e.subsections).forEach(a=>{e.subsections[a].isCollapsed=!0}),s||(n.isCollapsed=!1)}function fs(){var e;const t=((e=i.admin.sections.trojan)==null?void 0:e.subsections)||{};return Object.values(t).some(n=>!!(n!=null&&n.isEditing))}function bs(){var e;const t=((e=i.admin.sections.csc)==null?void 0:e.subsections)||{};return Object.values(t).some(n=>!!(n!=null&&n.isEditing))}function ks(){var e;const t=((e=i.admin.sections.cano)==null?void 0:e.subsections)||{};return Object.values(t).some(n=>!!(n!=null&&n.isEditing))}function xe(t){const e=t.specs,n=`${e.depth}${e.profile}${e.gage}${e.finish}`.trim(),s=[];if(n!==""&&s.push(n),e.paintTop!==""||e.paintBottom!==""){const o=e.paintTop===""?"-":e.paintTop,a=e.paintBottom===""?"-":e.paintBottom;s.push(`${o}/${a}`)}return e.grade!==""&&s.push(`Gr${e.grade}`),s.length===0?"New Profile":s.join(" ")}function ie(t){t.rowTons>0&&!t.tonsFromOverride&&(t.requiresOverride=!1,t.showOverride=!1)}function qo(){const t=new Map;return i.deckProfiles.forEach(e=>{var o;const n=String(((o=e==null?void 0:e.specs)==null?void 0:o.manufacturer)||"").trim()||"—",s=t.get(n)||{supplier:n,sqs:0,tons:0};s.sqs+=m(e.rowSqs),s.tons+=m(e.rowTons),t.set(n,s)}),Array.from(t.values())}function zo(t){var k;const e=t.inputs,n=Object.values(e).some(T=>m(T)>0);let s=0,o=0;if(t.tonsFromOverride=!1,t.method==="SQS")o=m(e.sqs),s=o*100;else if(t.method==="SqFt")s=m(e.sqft),o=s/100;else if(t.method==="LF"){const T=m(e.lf),E=m(e.lfWidthIn);s=T*(E/12),o=s/100}else if(t.method==="Cut List"){const T=m(e.pcs),E=m(e.cutWidthIn),S=m(e.lengthFt),C=m(e.inches),b=S+C/12;s=T*(E/12)*b,o=s/100}t.rowSqFt=s,t.rowSqs=o;const a=t.weightStatus||"INCOMPLETE";if(uo.some(T=>(t.specs[T]||"")==="")){t.weightStatus="INCOMPLETE",t.requiresOverride=!1,t.showOverride=!1,t.showWeightWarning=!1,t.missingLookupMessage="",t.rowTons=0,ie(t);return}const c=Wi(t.specs.depth,t.specs.profile,t.specs.gage),d=String(t.specs.finish||"").toUpperCase(),u=c!==""&&d!==""?(k=ve[c])==null?void 0:k[d]:void 0;if(Number.isFinite(Number(u))&&Number(u)>0){t.weightStatus="FOUND",a!=="FOUND"&&(t.overrideTons=""),t.showWeightWarning=!1,t.missingLookupMessage="",t.lastWarnSignature="";const T=o*Number(u)/2e3,E=m(t.overrideTons);if(n&&T<=0){t.requiresOverride=!0,t.showOverride=!0,t.rowTons=E>0?E:0,t.tonsFromOverride=E>0,ie(t);return}t.requiresOverride=!1,t.showOverride=!1,t.rowTons=T,ie(t);return}t.weightStatus="NOT_FOUND",t.requiresOverride=n,t.showOverride=n,t.showWeightWarning=!1,t.missingLookupMessage=`MISSING KEY: ${c} / ${d}`;const g=`${c}|${d}`;t.lastWarnSignature!==g&&(console.warn(`MISSING KEY: ${c} / ${d}`),t.lastWarnSignature=g);const f=m(t.overrideTons);if(n&&f>0){t.rowTons=f,t.tonsFromOverride=!0,ie(t);return}t.rowTons=0,t.showWeightWarning=n,ie(t)}function Ho(){let t=0,e=0;return i.deckProfiles.forEach(n=>{zo(n),t+=n.rowSqs,e+=n.rowTons}),{totalSqs:t,totalTons:e}}function J(t,e){return t.map(n=>{const s=typeof n=="string"?n:n.value,o=typeof n=="string"?n:n.label;return`<option value="${s}" ${s===e?"selected":""}>${o}</option>`}).join("")}function Ko(t){return t.method==="SQS"?`
      <div class="deck-row-inputs-grid">
        <div class="field-group">
          <label>SQS</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="sqs" value="${t.inputs.sqs}" />
        </div>
      </div>
    `:t.method==="SqFt"?`
      <div class="deck-row-inputs-grid">
        <div class="field-group">
          <label>SqFt</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="sqft" value="${t.inputs.sqft}" />
        </div>
      </div>
    `:t.method==="LF"?`
      <div class="deck-row-inputs-grid">
        <div class="field-group">
          <label>LF</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="lf" value="${t.inputs.lf}" />
        </div>
        <div class="field-group">
          <label>Width (in)</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="lfWidthIn" value="${t.inputs.lfWidthIn}" />
        </div>
      </div>
    `:t.method==="Cut List"?`
      <div class="deck-row-inputs-grid">
        <div class="field-group">
          <label>PCS</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="pcs" value="${t.inputs.pcs}" />
        </div>
        <div class="field-group">
          <label>WIDTH (in)</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="cutWidthIn" value="${t.inputs.cutWidthIn}" />
        </div>
        <div class="field-group">
          <label>LENGTH (ft)</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="lengthFt" value="${t.inputs.lengthFt}" />
        </div>
        <div class="field-group">
          <label>INCHES (in)</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="inches" value="${t.inputs.inches}" />
        </div>
      </div>
    `:""}function F(){const t=i.deckFlagSelectionOrder.filter(l=>i.deckFlags[l]),e=i.deckSpecsCollapsed?"+":"−",n=i.deckSpecsCollapsed?"":`
      <div class="deck-row-content">
        <fieldset class="deck-flags-fieldset">
          <label class="scope-option">
            <input type="checkbox" data-group="deck-flags" data-field="americanSteelRequired" ${i.deckFlags.americanSteelRequired?"checked":""} />
            AMERICAN STEEL REQUIRED
          </label>
          <label class="scope-option">
            <input type="checkbox" data-group="deck-flags" data-field="americanManufacturing" ${i.deckFlags.americanManufacturing?"checked":""} />
            AMERICAN MANUFACTURING
          </label>
          <label class="scope-option">
            <input type="checkbox" data-group="deck-flags" data-field="sdiManufacturer" ${i.deckFlags.sdiManufacturer?"checked":""} />
            SDI MANUFACTURER
          </label>
          <label class="scope-option">
            <input type="checkbox" data-group="deck-flags" data-field="specifiedManufacturer" ${i.deckFlags.specifiedManufacturer?"checked":""} />
            SPECIFIED MANUFACTURER
          </label>
          ${i.deckFlags.specifiedManufacturer?`<div class="field-group">
            <label>Specified Manufacturer Name</label>
            <select data-group="deck-flags" data-field="specifiedManufacturerName">
              ${J([{value:"",label:""},"TROJAN","CANO","CSC","CUTTING EDGE","CORDECK","CSM","HOUSTONBDECK"],i.deckFlags.specifiedManufacturerName)}
            </select>
          </div>`:""}
        </fieldset>
      </div>
    `,s=`
    <div class="deck-row deck-specs-row">
      <div class="deck-summary-row deck-specs-summary-row" data-action="toggle-specs" role="button" tabindex="0" aria-expanded="${!i.deckSpecsCollapsed}">
        <span class="deck-summary-toggle" aria-hidden="true">${e}</span>
        <span class="deck-summary-name">SPECS</span>
        ${t.length>0?`<span class="deck-summary-specs-list">${t.map(l=>`<span class="deck-summary-specs-item">${ro[l]||l}</span>`).join("")}</span>`:""}
      </div>
      ${n}
    </div>
  `,o=i.deckReviewMode?`
    <div class="deck-actions-row">
      ${i.deckProfiles.length>0?'<button type="button" class="btn-done-accordions">EDIT</button>':""}
    </div>
  `:`
    <div class="deck-actions-row">
      <button type="button" class="btn-add-profile">+ Add Profile</button>
      ${i.deckProfiles.length>0?'<button type="button" class="btn-duplicate-profile">+ Duplicate Profile</button>':""}
      <button type="button" class="btn-duplicate-profile btn-add-accessory">+ Add Accessories</button>
      ${i.deckProfiles.length>0?'<button type="button" class="btn-done-accordions">REVIEW</button>':""}
    </div>
  `,a=qo(),r=i.deckReviewMode&&a.length>0?`
    <div class="deck-review-summary-block">
      ${a.map(l=>`
        <div class="pricing-line-item">
          <div class="pricing-line-item-main">
            <span>${x(l.supplier)}</span>
            <strong>SQS: ${G(l.sqs)} | TONS: ${G(l.tons)}</strong>
          </div>
        </div>
      `).join("")}
      ${a.length>1?`<div class="pricing-line-item">
        <div class="pricing-line-item-main">
          <span>TOTAL COMBINED</span>
          <strong>SQS: ${G(i.totals.totalDeckSqs)} | TONS: ${G(i.totals.totalDeckTons)}</strong>
        </div>
      </div>`:""}
    </div>
  `:"",c=i.accessories.map((l,u)=>{const p=l.type||`Accessory #${u+1}`,g=Le(l.type)?`SCREWS: ${Y(Number.isFinite(l.screwCount)?l.screwCount:0)}`:je(l.type)?`TONS: ${G(m(l.tons))}`:"",f=l.isCollapsed?"+":"−",k=l.isCollapsed?"":`
          <div class="deck-row-content">
            <div class="deck-row-top">
              <p class="deck-row-title">${p}</p>
              <button type="button" class="btn-remove-row btn-remove-accessory" aria-label="Remove accessory ${u+1}">Remove</button>
            </div>
            <div class="deck-method-grid">
              <div class="field-group">
                <label>Accessory Type</label>
                <select data-group="accessory" data-field="type">${J([{value:"",label:""},...co],l.type)}</select>
              </div>
            </div>
            ${Le(l.type)?`<div class="deck-row-inputs-grid">
              <div class="field-group">
                <label>Screw Count</label>
                <input type="number" min="0" step="1" inputmode="numeric" data-group="accessory" data-field="screwCount" value="${l.screwCount??""}" />
              </div>
            </div>`:""}
            ${je(l.type)?`<div class="deck-row-inputs-grid">
              <div class="field-group">
                <label>Tons</label>
                <input type="number" min="0" step="any" inputmode="decimal" data-group="accessory" data-field="tons" value="${l.tons??""}" />
              </div>
            </div>`:""}
          </div>
        `;return`
        <div class="deck-row" data-accessory-id="${l.id}">
          <div class="deck-summary-row" data-id="a_${l.id}" role="button" tabindex="0" aria-expanded="${!l.isCollapsed}">
            <span class="deck-summary-toggle" aria-hidden="true">${f}</span>
            <span class="deck-summary-name">${p}</span>
            ${g?`<span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-sqs">${g}</span>`:""}
          </div>
          ${k}
        </div>
      `}).join("");if(i.deckProfiles.length===0&&i.accessories.length===0){jt.innerHTML=`${s}${o}${r}<p class="help-text">No deck profiles added.</p>`;return}const d=i.deckProfiles.map((l,u)=>{const p=l.isCollapsed?"+":"−",g=l.showOverride&&l.requiresOverride,f=l.isCollapsed?"":`
          <div class="deck-row-content">
            <div class="deck-row-top">
              <p class="deck-row-title">Profile ${u+1}</p>
              <div class="deck-row-actions">
                <button
                  type="button"
                  class="btn-common-spec"
                  data-action="apply-common-profile"
                  aria-label="Apply common profile preset for profile ${u+1}"
                >
                  Common: 1.5B20G60 GR50
                </button>
                <button type="button" class="btn-remove-row" aria-label="Remove profile ${u+1}">Remove</button>
              </div>
            </div>

            <div class="deck-spec-grid">
              <div class="field-group">
                <label>Depth</label>
                <select class="${Mt(l,"depth")?"required-missing":""}" data-group="specs" data-field="depth">${J([{value:"",label:""},...q.depth],l.specs.depth)}</select>
              </div>
              <div class="field-group">
                <label>Profile</label>
                <select class="${Mt(l,"profile")?"required-missing":""}" data-group="specs" data-field="profile">${J([{value:"",label:""},...q.profile],l.specs.profile)}</select>
              </div>
              <div class="field-group">
                <label>Gage</label>
                <select class="${Mt(l,"gage")?"required-missing":""}" data-group="specs" data-field="gage">${J([{value:"",label:""},...q.gage],l.specs.gage)}</select>
              </div>
              <div class="field-group">
                <label>Finish</label>
                <select class="${Mt(l,"finish")?"required-missing":""}" data-group="specs" data-field="finish">${J([{value:"",label:""},...q.finish],l.specs.finish)}</select>
              </div>
              <div class="field-group">
                <label>Paint Top</label>
                <select data-group="specs" data-field="paintTop">${J([{value:"",label:""},...q.paintTop],l.specs.paintTop)}</select>
              </div>
              <div class="field-group">
                <label>Paint Bottom</label>
                <select data-group="specs" data-field="paintBottom">${J([{value:"",label:""},...q.paintBottom],l.specs.paintBottom)}</select>
              </div>
              <div class="field-group">
                <label>Grade</label>
                <select class="${Mt(l,"grade")?"required-missing":""}" data-group="specs" data-field="grade">${J([{value:"",label:""},...q.grade],l.specs.grade)}</select>
              </div>
              <div class="field-group">
                <label>Manufacturer</label>
                <select class="${Mt(l,"manufacturer")?"required-missing":""}" data-group="specs" data-field="manufacturer">${J([{value:"",label:""},...q.manufacturer],l.specs.manufacturer)}</select>
              </div>
            </div>

            <div class="deck-method-grid">
              <div class="field-group">
                <label>Measurement Method</label>
                <select data-group="row" data-field="method">${J(ao,l.method)}</select>
              </div>
            </div>

            ${Ko(l)}

            ${g?`<div class="deck-row-inputs-grid">
              <div class="field-group">
                <label>Override Tons</label>
                <input class="required-missing" type="number" min="0" step="any" inputmode="decimal" data-group="row" data-field="overrideTons" value="${l.overrideTons}" required />
                ${l.showWeightWarning?`<p class="help-text">${l.missingLookupMessage}</p>`:""}
              </div>
            </div>`:""}
          
            <div class="deck-row-outputs">
              <div class="field-group">
                <label>Total Profile SQS</label>
                <input type="text" class="row-sqs-output" readonly value="${G(l.rowSqs)}" />
              </div>
              <div class="field-group">
                <label>Total Profile Tons</label>
                <input type="text" class="row-tons-output" readonly value="${G(l.rowTons)}" />
              </div>
            </div>
          </div>
        `;return`
        <div class="deck-row" data-row-id="${l.id}">
          <div class="deck-summary-row" data-id="p_${l.id}" role="button" tabindex="0" aria-expanded="${!l.isCollapsed}">
            <span class="deck-summary-toggle" aria-hidden="true">${p}</span>
            <span class="deck-summary-name">${xe(l)}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-supplier">${x(l.specs.manufacturer||"—")}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-sqs">SQS: ${G(l.rowSqs)}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-tons">TONS: ${G(l.rowTons)}</span>
          </div>

          ${f}
        </div>
      `}).join("");jt.innerHTML=`${s}${d}${c}${o}${r}`}function vi(t,e,n){const s=t.subsections[e],o=t.values[e],a=s.isCollapsed?"+":"−",r=s.isEditing?"":"disabled",c=s.isEditing?"SAVE":"EDIT",d=s.isEditing?"":"disabled",l=(o.buckets||[]).map((g,f)=>{const k=v(g.start),T=v(g.end),E=v(g.cost);return`
      <div class="csc-bucket-row">
        <input
          type="text"
          inputmode="decimal"
          data-csc-field="bucket-start"
          data-csc-subsection="${e}"
          data-csc-row="${f}"
          value="${k}"
          ${r}
        />
        <input
          type="text"
          inputmode="decimal"
          data-csc-field="bucket-end"
          data-csc-subsection="${e}"
          data-csc-row="${f}"
          value="${T}"
          ${r}
        />
        <input
          type="text"
          inputmode="decimal"
          data-csc-field="bucket-cost"
          data-csc-subsection="${e}"
          data-csc-row="${f}"
          value="${s.isEditing?String(E):M(E)}"
          ${r}
        />
      </div>
    `}).join(""),u=e==="joists"?`
        <div class="field-group csc-extra-row">
          <label>Extra shipping fee for 0-9 tons (flat $)</label>
          <input
            type="text"
            inputmode="decimal"
            data-csc-field="extra-shipping-0-9"
            data-csc-subsection="joists"
            value="${s.isEditing?String(v(o.extraShippingFee_0_9)):M(o.extraShippingFee_0_9)}"
            ${r}
          />
        </div>
      `:"",p=s.isCollapsed?"":`
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="csc-toggle-edit" data-csc-subsection="${e}">
            ${c}
          </button>
          <button type="button" class="btn-secondary" data-action="csc-add-row" data-csc-subsection="${e}" ${d}>
            + Add Row
          </button>
        </div>
        <div class="csc-bucket-grid">
          <div class="csc-bucket-header">
            <span>Start</span>
            <span>End</span>
            <span>Cost / Ton</span>
          </div>
          ${l}
        </div>
        ${u}
      </div>
    `;return`
    <section class="admin-section csc-subsection" data-csc-subsection="${e}">
      <div class="admin-summary-row" data-action="csc-toggle-sub" data-csc-subsection="${e}" role="button" tabindex="0" aria-expanded="${!s.isCollapsed}">
        <span class="admin-summary-toggle" aria-hidden="true">${a}</span>
        <span class="admin-summary-name">${n}</span>
      </div>
      ${p}
    </section>
  `}function un(t,e,n,s="LEAD TIMES"){const o=String(t||"").trim().toLowerCase(),a=e.isCollapsed?"+":"−",r=e.isEditing?"":"disabled",c=e.isEditing?"SAVE":"EDIT",l=(o==="trojan"?[{key:"submittalsDeckOnly",label:"Submittals (Deck Only)"},{key:"submittalsJoistsUnder50",label:"Submittals (Joists < 50T)"},{key:"submittalsDeckAndJoistsOver50",label:"Submittals (Deck+Joists >= 50T)"},{key:"fabrication",label:"Fabrication"}]:[{key:"fabrication",label:"Fabrication"}]).map(g=>{var T,E;const f=U((T=n==null?void 0:n[g.key])==null?void 0:T.min),k=U((E=n==null?void 0:n[g.key])==null?void 0:E.max);return`
        <div class="csc-bucket-row">
          <span>${g.label}</span>
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            data-leadtime-supplier="${o}"
            data-leadtime-path="${g.key}"
            data-leadtime-bound="min"
            value="${f===""?"":f}"
            ${r}
          />
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            data-leadtime-supplier="${o}"
            data-leadtime-path="${g.key}"
            data-leadtime-bound="max"
            value="${k===""?"":k}"
            ${r}
          />
        </div>
      `}).join(""),u=e.error?`<p class="help-text">${x(e.error)}</p>`:"",p=e.isCollapsed?"":`
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button
            type="button"
            class="btn-primary"
            data-action="leadtime-toggle-edit"
            data-leadtime-supplier="${o}"
          >
            ${c}
          </button>
        </div>
        <div class="csc-bucket-grid">
          <div class="csc-bucket-header">
            <span>Type</span>
            <span>Min</span>
            <span>Max</span>
          </div>
          ${l}
        </div>
        ${u}
      </div>
    `;return`
    <section class="admin-section csc-subsection" data-leadtime-subsection="${o}">
      <div
        class="admin-summary-row"
        data-action="leadtime-toggle-sub"
        data-leadtime-supplier="${o}"
        role="button"
        tabindex="0"
        aria-expanded="${!e.isCollapsed}"
      >
        <span class="admin-summary-toggle" aria-hidden="true">${a}</span>
        <span class="admin-summary-name">${s}</span>
      </div>
      ${p}
    </section>
  `}function Wo(t,e,n){const s=ct(t.values);t.values=s;const o=t.isCollapsed?"+":"−",a=t.isEditing?"":"disabled",r=t.isEditing?"SAVE":"EDIT",c=t.isEditing?"":"disabled",d=(s.buckets||[]).map((u,p)=>{const g=v(u.start),f=v(u.end),k=String(u.scopeType||"DECK+JOISTS").toUpperCase(),T=Number.parseInt(String(u.tier||2),10),E=v(u.detailingPercent);return`
      <div class="detailing-bucket-row">
        <input
          type="text"
          inputmode="decimal"
          data-detailing-field="bucket-start"
          data-detailing-row="${p}"
          value="${g}"
          ${a}
        />
        <input
          type="text"
          inputmode="decimal"
          data-detailing-field="bucket-end"
          data-detailing-row="${p}"
          value="${f}"
          ${a}
        />
        <select
          data-detailing-field="scope-type"
          data-detailing-row="${p}"
          ${a}
        >
          ${$e.map(S=>`<option value="${S}" ${S===k?"selected":""}>${S}</option>`).join("")}
        </select>
        <select
          data-detailing-field="tier"
          data-detailing-row="${p}"
          ${a}
        >
          ${De.map(S=>`<option value="${S}" ${S===T?"selected":""}>${S}</option>`).join("")}
        </select>
        <input
          type="text"
          inputmode="decimal"
          data-detailing-field="detailing-percent"
          data-detailing-row="${p}"
          value="${t.isEditing?String(E):G(E)}"
          ${a}
        />
      </div>
    `}).join(""),l=t.isCollapsed?"":`
      <div class="admin-section-content" data-admin-content="${e}">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="detailing-toggle-edit" data-section="${e}">
            ${r}
          </button>
          <button type="button" class="btn-secondary" data-action="detailing-add-row" data-section="${e}" ${c}>
            + Add Row
          </button>
        </div>
        <div class="detailing-bucket-grid csc-bucket-grid">
          <div class="detailing-bucket-header csc-bucket-header">
            <span>Start Tons</span>
            <span>End Tons</span>
            <span>Scope Type</span>
            <span>Tier</span>
            <span>Detailing %</span>
          </div>
          ${d}
        </div>
        <p class="help-text">Minimum detailing fee applied automatically: ${h(Math.max(500,v(s.minimumFee)))}</p>
      </div>
    `;return`
    <section class="admin-section" data-admin-section="${e}">
      <div class="admin-summary-row" data-admin-id="${e}" role="button" tabindex="0" aria-expanded="${!t.isCollapsed}">
        <span class="admin-summary-toggle" aria-hidden="true">${o}</span>
        <span class="admin-summary-name">${n}</span>
      </div>
      ${l}
    </section>
  `}function vt(t,e,n){const s=t.subsections[e],o=s.isCollapsed?"+":"−",a=s.isEditing?"":"disabled",r=s.isEditing?"SAVE":"EDIT";if(e==="conditions"){const p=Array.isArray(t.values.documentConditions)?t.values.documentConditions:[],g=s.isEditing?"":"disabled",f=p.length>0?p.map((T,E)=>`
        <div class="trojan-conditions-row" data-trojan-condition-row="${T.id}">
          <select data-trojan-condition-field="slot" data-trojan-condition-id="${T.id}" ${a}>
            ${ji.map(S=>`<option value="${S.value}" ${S.value===T.slot?"selected":""}>${S.label}</option>`).join("")}
          </select>
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            data-trojan-condition-field="after-number"
            data-trojan-condition-id="${T.id}"
            value="${Number.isFinite(Number(T.afterNumber))?Number(T.afterNumber):0}"
            ${a}
            title="Insert after numbered item"
          />
          <textarea
            rows="3"
            data-trojan-condition-field="text"
            data-trojan-condition-id="${T.id}"
            ${a}
          >${x(T.text||"")}</textarea>
          <button
            type="button"
            class="btn-secondary"
            data-action="trojan-remove-condition-row"
            data-trojan-condition-id="${T.id}"
            ${g}
          >
            Remove
          </button>
        </div>
      `).join(""):'<p class="help-text">No custom conditions yet.</p>',k=s.isCollapsed?"":`
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="trojan-toggle-edit" data-trojan-subsection="${e}">
            ${r}
          </button>
          <button type="button" class="btn-secondary" data-action="trojan-add-condition-row" data-trojan-subsection="${e}" ${g}>
            + Add Row
          </button>
        </div>
        <div class="trojan-conditions-list">
          ${f}
        </div>
      </div>
    `;return`
      <section class="admin-section csc-subsection" data-trojan-subsection="${e}">
        <div class="admin-summary-row" data-action="trojan-toggle-sub" data-trojan-subsection="${e}" role="button" tabindex="0" aria-expanded="${!s.isCollapsed}">
          <span class="admin-summary-toggle" aria-hidden="true">${o}</span>
          <span class="admin-summary-name">${n}</span>
        </div>
        ${k}
      </section>
    `}if(e==="leadTimes")return un("trojan",s,t.values.leadTimes,n);const l=(Li[e]||[]).map(p=>ut.trojan.fields.find(g=>g.key===p)).filter(Boolean).map(p=>{const g=t.values[p.key],f=p.type==="text"?String(g||""):s.isEditing?g===""?"":String(v(g)):M(g,{blankAsEmpty:!0});return`
        <div class="field-group">
          <label>${p.label}</label>
          <input
            type="text"
            inputmode="${p.type==="text"?"text":"decimal"}"
            data-admin-field="${p.key}"
            data-admin-type="${p.type||"currency"}"
            autocomplete="${p.type==="text"?"street-address":"off"}"
            value="${f}"
            ${a}
          />
        </div>
      `}).join(""),u=s.isCollapsed?"":`
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="trojan-toggle-edit" data-trojan-subsection="${e}">
            ${r}
          </button>
        </div>
        ${l}
      </div>
    `;return`
    <section class="admin-section csc-subsection" data-trojan-subsection="${e}">
      <div class="admin-summary-row" data-action="trojan-toggle-sub" data-trojan-subsection="${e}" role="button" tabindex="0" aria-expanded="${!s.isCollapsed}">
        <span class="admin-summary-toggle" aria-hidden="true">${o}</span>
        <span class="admin-summary-name">${n}</span>
      </div>
      ${u}
    </section>
  `}function D(){const t=Object.keys(ut).map(e=>{const n=ut[e],s=i.admin.sections[e],o=s.isCollapsed?"+":"−";if(e==="trojan"){const c=s.isCollapsed?"":`
            <div class="admin-section-content" data-admin-content="${e}">
              <div class="csc-subsections">
                ${vt(s,"inbound","INBOUND")}
                ${vt(s,"mfg","MFG")}
                ${vt(s,"outbound","OUTBOUND")}
                ${vt(s,"accessories","ACCESSORIES")}
                ${vt(s,"leadTimes","LEAD TIMES")}
                ${vt(s,"margins","MARGINS")}
                ${vt(s,"conditions","CONDITIONS")}
              </div>
            </div>
          `;return`
          <section class="admin-section" data-admin-section="${e}">
            <div class="admin-summary-row" data-admin-id="${e}" role="button" tabindex="0" aria-expanded="${!s.isCollapsed}">
              <span class="admin-summary-toggle" aria-hidden="true">${o}</span>
              <span class="admin-summary-name">${n.label}</span>
            </div>
            ${c}
          </section>
        `}if(e==="csc"){const c=s.isCollapsed?"":`
            <div class="admin-section-content" data-admin-content="${e}">
              <div class="csc-subsections">
                ${vi(s,"joists","JOISTS")}
                ${vi(s,"deck","DECK")}
                ${un("csc",s.subsections.leadTimes,s.values.leadTimes,"LEAD TIMES")}
              </div>
            </div>
          `;return`
          <section class="admin-section" data-admin-section="${e}">
            <div class="admin-summary-row" data-admin-id="${e}" role="button" tabindex="0" aria-expanded="${!s.isCollapsed}">
              <span class="admin-summary-toggle" aria-hidden="true">${o}</span>
              <span class="admin-summary-name">${n.label}</span>
            </div>
            ${c}
          </section>
        `}if(e==="detailing")return Wo(s,e,n.label);if(e==="cano"){const c=s.isCollapsed?"":`
            <div class="admin-section-content" data-admin-content="${e}">
              <div class="admin-section-actions">
                <button type="button" class="btn-primary" data-action="admin-toggle-edit" data-section="${e}">
                  ${s.isEditing?"SAVE":"EDIT"}
                </button>
              </div>
              <div class="field-group">
                <label>$/LB</label>
                <input
                  type="text"
                  inputmode="decimal"
                  data-admin-field="perLb"
                  data-admin-type="currency"
                  autocomplete="off"
                  value="${s.isEditing?s.values.perLb===""?"":String(v(s.values.perLb)):M(s.values.perLb,{blankAsEmpty:!0})}"
                  ${s.isEditing?"":"disabled"}
                />
              </div>
              <div class="csc-subsections">
                ${un("cano",s.subsections.leadTimes,s.values.leadTimes,"LEAD TIMES")}
              </div>
            </div>
          `;return`
          <section class="admin-section" data-admin-section="${e}">
            <div class="admin-summary-row" data-admin-id="${e}" role="button" tabindex="0" aria-expanded="${!s.isCollapsed}">
              <span class="admin-summary-toggle" aria-hidden="true">${o}</span>
              <span class="admin-summary-name">${n.label}</span>
            </div>
            ${c}
          </section>
        `}const a=n.fields.map(c=>{const d=s.values[c.key],l=c.type==="text"?String(d||""):s.isEditing?d===""?"":String(v(d)):M(d,{blankAsEmpty:!0}),u=s.isEditing?"":"disabled";return`
            <div class="field-group">
              <label>${c.label}</label>
              <input
                type="text"
                inputmode="${c.type==="text"?"text":"decimal"}"
                data-admin-field="${c.key}"
                data-admin-type="${c.type||"currency"}"
                autocomplete="${c.type==="text"?"street-address":"off"}"
                value="${l}"
                ${u}
              />
            </div>
          `}).join(""),r=s.isCollapsed?"":`
          <div class="admin-section-content" data-admin-content="${e}">
            <div class="admin-section-actions">
              <button type="button" class="btn-primary" data-action="admin-toggle-edit" data-section="${e}">
                ${s.isEditing?"SAVE":"EDIT"}
              </button>
            </div>
            ${a}
          </div>
        `;return`
        <section class="admin-section" data-admin-section="${e}">
          <div class="admin-summary-row" data-admin-id="${e}" role="button" tabindex="0" aria-expanded="${!s.isCollapsed}">
            <span class="admin-summary-toggle" aria-hidden="true">${o}</span>
            <span class="admin-summary-name">${n.label}</span>
          </div>
          ${r}
        </section>
      `}).join("");nt.innerHTML=t,Io()}function Yo(){if(i.admin.changelog.length===0){Fn.innerHTML='<p class="help-text">No changelog entries yet.</p>';return}const t=[...i.admin.changelog].sort((e,n)=>n.timestamp-e.timestamp).map(e=>`
      <div class="admin-changelog-entry">
        <div class="admin-changelog-line">${mo(e.timestamp)}</div>
        <div class="admin-changelog-line">${e.section} | ${e.metric}</div>
        <div class="admin-changelog-line">${typeof e.from=="string"||typeof e.to=="string"?`${String(e.from||"")} → ${String(e.to||"")}`:`${M(e.from)} → ${M(e.to)}`}</div>
      </div>
    `).join("");Fn.innerHTML=t}function Qo(t){const e=nt.querySelector(`[data-admin-section="${t}"]`);if(!e)return;const n=i.admin.sections[t],s=ut[t],o={...n.values};s.fields.forEach(a=>{const r=e.querySelector(`[data-admin-field="${a.key}"]`);if(!r)return;const c=a.type==="text"?String(r.value||"").trim():v(r.value);n.values[a.key]=c}),s.fields.forEach(a=>{const r=a.type==="text"?String(o[a.key]||"").trim():v(o[a.key]),c=a.type==="text"?String(n.values[a.key]||"").trim():v(n.values[a.key]);r!==c&&i.admin.changelog.push({timestamp:Date.now(),section:s.label,metric:a.label,from:r,to:c})}),n.isEditing=!1,zt(),D(),t==="trojan"&&pe()}function Xo(t){const e=nt.querySelector('[data-admin-section="csc"]');if(!e)return;const n=i.admin.sections.csc,s=n.values[t];if(s){if((s.buckets||[]).forEach((o,a)=>{const r=e.querySelector(`[data-csc-field="bucket-start"][data-csc-subsection="${t}"][data-csc-row="${a}"]`),c=e.querySelector(`[data-csc-field="bucket-end"][data-csc-subsection="${t}"][data-csc-row="${a}"]`),d=e.querySelector(`[data-csc-field="bucket-cost"][data-csc-subsection="${t}"][data-csc-row="${a}"]`);s.buckets[a]={start:v(r==null?void 0:r.value),end:v(c==null?void 0:c.value),cost:v(d==null?void 0:d.value)}}),t==="joists"){const o=e.querySelector('[data-csc-field="extra-shipping-0-9"][data-csc-subsection="joists"]');o&&(s.extraShippingFee_0_9=v(o.value))}n.subsections[t].isEditing=!1,zt(),D(),I()}}function Zo(t){var c,d;const e=i.admin.sections.csc,n=(c=e.subsections)==null?void 0:c[t],s=(d=e.values)==null?void 0:d[t];if(!n||!s||!Array.isArray(s.buckets)||!n.isEditing)return;const o=s.buckets[s.buckets.length-1],a=o?v(o.end):0,r=s.buckets.length>0?a+1:0;s.buckets.push({start:r,end:r,cost:0}),D()}function ta(){const t=nt.querySelector('[data-admin-section="detailing"]');if(!t)return;const e=i.admin.sections.detailing,n=ct(e.values);n.buckets=(n.buckets||[]).map((s,o)=>{const a=t.querySelector(`[data-detailing-field="bucket-start"][data-detailing-row="${o}"]`),r=t.querySelector(`[data-detailing-field="bucket-end"][data-detailing-row="${o}"]`),c=t.querySelector(`[data-detailing-field="scope-type"][data-detailing-row="${o}"]`),d=t.querySelector(`[data-detailing-field="tier"][data-detailing-row="${o}"]`),l=t.querySelector(`[data-detailing-field="detailing-percent"][data-detailing-row="${o}"]`);return{start:v(a==null?void 0:a.value),end:v(r==null?void 0:r.value),scopeType:$e.includes(String((c==null?void 0:c.value)||"").toUpperCase())?String(c.value).toUpperCase():"DECK+JOISTS",tier:De.includes(Number.parseInt(String((d==null?void 0:d.value)||""),10))?Number.parseInt(String(d.value),10):2,detailingPercent:v(l==null?void 0:l.value)}}),e.values=ct(n),e.isEditing=!1,zt(),D(),I()}function ea(){const t=i.admin.sections.detailing;if(!t.isEditing)return;const e=ct(t.values),n=e.buckets[e.buckets.length-1],s=n?v(n.end):0,o=e.buckets.length>0?s+1:0;e.buckets.push({start:o,end:o,scopeType:"DECK+JOISTS",tier:2,detailingPercent:4}),t.values=e,D()}function na(){var n;const t=i.admin.sections.trojan,e=(n=t.subsections)==null?void 0:n.conditions;!e||!e.isEditing||(Array.isArray(t.values.documentConditions)||(t.values.documentConditions=[]),t.values.documentConditions.push({id:Ae,slot:"GENERAL_SALE_TERMS_CONTINUED",afterNumber:0,text:""}),Ae+=1,D())}function ia(t){var r;const e=nt.querySelector('[data-admin-section="trojan"]');if(!e)return;const n=i.admin.sections.trojan,s=(r=n.subsections)==null?void 0:r[t];if(!s)return;if(t==="conditions"){const d=Array.from(e.querySelectorAll("[data-trojan-condition-row]")).map(l=>{const u=Number.parseInt(String(l.getAttribute("data-trojan-condition-row")||""),10),p=l.querySelector('[data-trojan-condition-field="slot"]'),g=l.querySelector('[data-trojan-condition-field="after-number"]'),f=l.querySelector('[data-trojan-condition-field="text"]'),k=String((p==null?void 0:p.value)||"").trim().toUpperCase(),T=Ii.includes(k)?k:"GENERAL_SALE_TERMS_CONTINUED",E=Number.parseInt(String((g==null?void 0:g.value)??""),10),S=String((f==null?void 0:f.value)||"").trim();return{id:Number.isFinite(u)&&u>0?u:Ae++,slot:T,afterNumber:Number.isFinite(E)&&E>=0?E:0,text:S}}).filter(l=>l.text!=="");n.values.documentConditions=d,s.isEditing=!1,zt(),D();return}const o=Li[t]||[],a={...n.values};o.forEach(c=>{const d=ut.trojan.fields.find(f=>f.key===c);if(!d)return;const l=e.querySelector(`[data-admin-field="${c}"]`);if(!l)return;const u=d.type==="text"?String(l.value||"").trim():v(l.value);n.values[c]=u;const p=d.type==="text"?String(a[c]||"").trim():v(a[c]),g=d.type==="text"?String(u||"").trim():v(u);p!==g&&i.admin.changelog.push({timestamp:Date.now(),section:"TROJAN",metric:d.label,from:p,to:g})}),s.isEditing=!1,zt(),D(),t==="outbound"&&pe(),I()}function Pe(t){var a,r;const e=String(t||"").trim().toLowerCase();if(!["trojan","csc","cano"].includes(e))return null;const n=i.admin.sections[e],s=(a=n==null?void 0:n.subsections)==null?void 0:a.leadTimes,o=(r=n==null?void 0:n.values)==null?void 0:r.leadTimes;return!n||!s||!o?null:{section:n,subsection:s,values:o,normalized:e}}function sa(t){const e=Pe(t);if(!e)return;const{subsection:n,values:s,normalized:o}=e,a=nt.querySelector(`[data-admin-section="${o}"]`);if(!a)return;const r=o==="trojan"?["submittalsDeckOnly","submittalsJoistsUnder50","submittalsDeckAndJoistsOver50","fabrication"]:["fabrication"],c=JSON.parse(JSON.stringify(s));for(const d of r){const l=a.querySelector(`[data-leadtime-supplier="${o}"][data-leadtime-path="${d}"][data-leadtime-bound="min"]`),u=a.querySelector(`[data-leadtime-supplier="${o}"][data-leadtime-path="${d}"][data-leadtime-bound="max"]`),p=String((l==null?void 0:l.value)??"").trim(),g=String((u==null?void 0:u.value)??"").trim(),f=U(p),k=U(g);if(p!==""&&f===""||g!==""&&k===""){n.error=`${d[0].toUpperCase()}${d.slice(1)} lead times must be non-negative integers.`,D();return}if(f!==""&&k!==""&&f>k){n.error=`${d[0].toUpperCase()}${d.slice(1)} Min must be less than or equal to Max.`,D();return}c[d]={min:f,max:k}}n.error="",n.isEditing=!1,e.section.values.leadTimes=c,zt(),D(),I()}function oa(){const{totalSqs:t,totalTons:e}=Ho();i.deckProfiles.forEach(n=>{const s=jt.querySelector(`[data-row-id="${n.id}"]`);if(!s)return;const o=s.querySelector(".deck-summary-sqs"),a=s.querySelector(".deck-summary-tons"),r=s.querySelector(".row-sqs-output"),c=s.querySelector(".row-tons-output");o&&(o.textContent=`SQS: ${G(n.rowSqs)}`),a&&(a.textContent=`TONS: ${G(n.rowTons)}`),r&&(r.value=G(n.rowSqs)),c&&(c.value=G(n.rowTons))}),i.totals.totalDeckSqs=t,i.totals.totalDeckTons=e,i.totals.deckTotal=0,Zs.value=G(i.totals.totalDeckSqs),Ji.value=h(i.totals.deckTotal),to.value=G(i.totals.totalDeckTons),Fs.classList.add("hidden")}function aa(){const t=i.joists.tons.trim();if(t==="")return 0;const e=Number(t);if(Number.isNaN(e)||e<0)return 0;if(i.joists.supplier==="CSC"){const o=Po(e);if(!o||o.cost<=0)return 0;const a=e<=9?v(i.admin.sections.csc.values.joists.extraShippingFee_0_9):0;return e*o.cost+a}return e*Dn.CANO.poundsPerTon*Dn.CANO.ratePerPound}function ra(){const t=i.deckProfiles.reduce((c,d)=>Ht(d.specs.manufacturer)!=="TROJAN"?c:c+(Number.isFinite(d.rowTons)?d.rowTons:0),0),e=v(i.admin.sections.trojan.values.outboundFreightPerMi),n=m(i.milesFromTrojanFacility);if(t<=0||e<=0||n<=0)return{cost:0,trucks:0,miles:n,rate:e,totalTrojanDeckTons:t};const s=t*2e3,a=Math.ceil(s/48e3);return{cost:a*n*e,trucks:a,miles:n,rate:e,totalTrojanDeckTons:t}}function ca(){xn&&(xn.value=h(i.totals.joistsTotal)),Jn&&(Jn.value=G(i.totals.totalDeckSqs)),_n&&(_n.value=h(i.totals.deckTotal)),Vn&&(Vn.value=G(i.totals.totalDeckTons)),zn&&(zn.textContent=h(i.totals.trojanShipping)),Hn&&(Hn.textContent=`TRUCKS: ${i.totals.trojanShippingTrucks||0} | MILES: ${G(i.totals.trojanShippingMiles||0)} | RATE: ${M(i.totals.trojanShippingRate||0)}/MI`);const t=i.totals.trojanShipping>0&&(i.totals.trojanShippingTrucks||0)>0&&(i.totals.trojanShippingMiles||0)>0&&(i.totals.trojanShippingRate||0)>0;qn&&qn.classList.toggle("hidden",!t),Kn&&(Kn.value=h(i.totals.grandTotal));const e=m(i.totals.trojanDeckTons),n=m(i.totals.brokeredDeckTons),s=m(i.joists.tons);if(ri){const o=e+n+s;ri.textContent=G(o)}}function da(t=null){const e=t||Xt();return e.hasTrojanDeck?`
    <div class="pricing-cogs-grid">
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Coil Cost</span><strong>${h(e.coilCost)}</strong></div>
        <p class="pricing-cogs-meta">${Y(e.lbs)} LB x ${M(v(i.admin.sections.trojan.values.coilCostPerLb))}/LB</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Inbound Freight</span><strong>${h(e.inboundCost)}</strong></div>
        <p class="pricing-cogs-meta">${Y(e.lbs)} LB x ${M(v(i.admin.sections.trojan.values.inboundFreightPerLb))}/LB</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Labor</span><strong>${h(e.laborCost)}</strong></div>
        <p class="pricing-cogs-meta">${Y(e.lbs)} LB x ${M(v(i.admin.sections.trojan.values.laborPerLb))}/LB</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Total Trucks</span><strong>${Y(e.trucks)}</strong></div>
        <p class="pricing-cogs-meta">${Y(e.lbs)} LB / 48,000 LB per truck</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Total Miles</span><strong>${G(e.miles)}</strong></div>
        <p class="pricing-cogs-meta">Facility to project location (driving)</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Outbound Freight</span><strong>${h(e.outboundCost)}</strong></div>
        <p class="pricing-cogs-meta">${Y(e.trucks)} trucks x ${G(e.miles)} miles x ${M(v(i.admin.sections.trojan.values.outboundFreightPerMi))}/MI</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Total COGS</span><strong>${h(e.totalCogs)}</strong></div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row">
          <span>Margin %</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value="${e.marginPercent}"
            data-action="pricing-margin-input"
            data-pricing-margin-section="trojanDeck"
          />
        </div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Margin Amount</span><strong>${h(e.marginAmount)}</strong></div>
        <p class="pricing-cogs-meta">${h(e.totalCogs)} x ${G(e.marginPercent)}% (minimum ${h(e.minimumMarginAmount)})</p>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Retail Trojan Deck Price</span><strong>${h(e.totalWithMargin)}</strong></div>
      </div>
    </div>
  `:'<p class="help-text">No Trojan deck tons in scope.</p>'}function Xt(t=null){const e=i.admin.sections.trojan.values,n=m(t===null?i.totals.trojanDeckTons:t),s=n*2e3,o=v(e.coilCostPerLb),a=v(e.inboundFreightPerLb),r=v(e.laborPerLb),c=v(e.outboundFreightPerMi),d=m(i.milesFromTrojanFacility),l=n>0?Math.ceil(s/48e3):0,u=s*o,p=s*a,g=s*r,f=l*d*c,k=u+p+g+f,T=vn(),E=rt(k,"trojanDeck"),S=E.marginAmount,C=k+S;return{hasTrojanDeck:n>0,trojanDeckTons:n,lbs:s,trucks:l,miles:d,coilCost:u,inboundCost:p,laborCost:g,outboundCost:f,totalCogs:k,marginPercent:E.marginPercent,minimumMarginAmount:T,marginAmount:S,totalWithMargin:C}}function me(){const t=i.admin.sections.trojan.values,e=v(t.accessoriesCostPerScrew),n=v(t.accessoriesCostPerTon),s=(i.accessories||[]).reduce((d,l)=>{if(!Le(l.type))return d;const u=Number.isFinite(l.screwCount)?l.screwCount:0;return d+Math.max(0,u)},0),o=(i.accessories||[]).reduce((d,l)=>je(l.type)?d+m(l.tons):d,0),a=s*e,r=o*n,c=a+r;return{hasAccessories:s>0||o>0,totalScrewCount:s,totalAccessoryTons:o,costPerScrew:e,costPerTon:n,screwCost:a,tonnageCost:r,totalCogs:c}}function la(){const t=me();if(!t.hasAccessories)return'<p class="help-text">No accessories in scope.</p>';const e=t.totalScrewCount>0?`
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Screw Count Cost</span><strong>${h(t.screwCost)}</strong></div>
        <p class="pricing-cogs-meta">${Y(t.totalScrewCount)} screws x ${M(t.costPerScrew)} each</p>
      </div>
    `:"",n=t.totalAccessoryTons>0?`
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Accessories Tonnage Cost</span><strong>${h(t.tonnageCost)}</strong></div>
        <p class="pricing-cogs-meta">${G(t.totalAccessoryTons)} tons x ${M(t.costPerTon)}/TON</p>
      </div>
    `:"";return`
    <div class="pricing-cogs-grid">
      ${e}
      ${n}
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Total Accessories COGS Delivered</span><strong>${h(t.totalCogs)}</strong></div>
      </div>
    </div>
  `}function Je(){const t=m(i.joists.tons),e=String(i.joists.supplier||"").trim().toUpperCase();if(t<=0||e==="")return{hasJoists:!1,supplier:e,tons:0,lbs:0,baseCost:0,surcharge:0,subtotalCost:0,marginPercent:It("joists"),marginAmount:0,totalCost:0,detail:""};if(e==="CANO"){const s=v(i.admin.sections.cano.values.perLb),o=t*2e3,a=o*s,r=rt(a,"joists");return{hasJoists:!0,supplier:e,tons:t,lbs:o,baseCost:a,surcharge:0,subtotalCost:a,marginPercent:r.marginPercent,marginAmount:r.marginAmount,totalCost:r.totalWithMargin,detail:`${Y(o)} LB x ${M(s)}/LB`}}if(e==="CSC"){const s=Yt({vendor:"CSC",scope:"JOISTS",tons:t}),o=s.pricePerTon,a=t*o,r=s.bucketStart===0&&s.bucketEnd===9?v(i.admin.sections.csc.values.joists.extraShippingFee_0_9):0,c=a+r,d=rt(c,"joists");return{hasJoists:!0,supplier:e,tons:t,lbs:t*2e3,baseCost:a,surcharge:r,subtotalCost:c,marginPercent:d.marginPercent,marginAmount:d.marginAmount,totalCost:d.totalWithMargin,detail:`${G(t)} TONS x ${M(o)}/TON`}}const n=rt(0,"joists");return{hasJoists:!0,supplier:e,tons:t,lbs:t*2e3,baseCost:0,surcharge:0,subtotalCost:0,marginPercent:n.marginPercent,marginAmount:n.marginAmount,totalCost:0,detail:""}}function Cs(t,e,n){const s=[];t!=null&&t.hasTrojanDeck&&s.push({supplier:"TROJAN",subtotalCost:m(t.totalCogs),marginAmount:m(t.marginAmount),locked:!!i.pricingMarginOverrides.trojanDeck,sync:o=>{t.marginAmount=o,t.marginPercent=t.totalCogs>0?o/t.totalCogs*100:t.marginPercent,t.totalWithMargin=t.totalCogs+o}}),((e==null?void 0:e.entries)||[]).forEach(o=>{s.push({supplier:String(o.vendor||"").trim().toUpperCase(),subtotalCost:m(o.cost),marginAmount:m(o.marginAmount),locked:!!i.pricingMarginOverrides.brokeredDeck,sync:a=>{o.marginAmount=a,o.marginPercent=o.cost>0?a/o.cost*100:o.marginPercent,o.totalCost=o.cost+a}})}),n!=null&&n.hasJoists&&s.push({supplier:String(n.vendor||"").trim().toUpperCase(),subtotalCost:m(n.subtotalCost),marginAmount:m(n.marginAmount),locked:!!i.pricingMarginOverrides.joists,sync:o=>{n.marginAmount=o,n.marginPercent=n.subtotalCost>0?o/n.subtotalCost*100:n.marginPercent,n.totalCost=n.subtotalCost+o}}),Vi(s,vn()),e&&(e.marginAmount=(e.entries||[]).reduce((o,a)=>o+m(a.marginAmount),0),e.marginPercent=e.subtotalCost>0?e.marginAmount/e.subtotalCost*100:0,e.totalCost=e.subtotalCost+e.marginAmount)}function ua(t=null){const e=t||Je();if(!e.hasJoists)return'<p class="help-text">No joists in scope.</p>';const n=e.surcharge>0?`
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>CSC Surcharge (&lt;10 Tons)</span><strong>${h(e.surcharge)}</strong></div>
      </div>
    `:"";return`
    <div class="pricing-cogs-grid">
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>${e.supplier} Joist Cost</span><strong>${h(e.baseCost)}</strong></div>
        <p class="pricing-cogs-meta">${e.detail}</p>
      </div>
      ${n}
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row">
          <span>Margin %</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value="${e.marginPercent}"
            data-action="pricing-margin-input"
            data-pricing-margin-section="joists"
          />
        </div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Margin Amount</span><strong>${h(e.marginAmount)}</strong></div>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Total Joist Cost</span><strong>${h(e.totalCost)}</strong></div>
      </div>
    </div>
  `}function pa(t,e){const n=m(t)>0,s=m(e)>0;return n&&s?"DECK+JOISTS":n?"DECK_ONLY":s?"JOIST_ONLY":""}function ma(t,e,n){const s=ct(i.admin.sections.detailing.values),o=An(t),a=Number.parseInt(String(n),10),r=s.buckets||[],c=r.find(g=>g.scopeType===e&&g.tier===a&&o>=v(g.start)&&o<=v(g.end));if(c)return{...c,bucketTons:o};const d=r.filter(g=>g.scopeType===e&&g.tier===a),l=d.sort((g,f)=>v(g.end)-v(f.end))[d.length-1];if(l)return{...l,bucketTons:o};const u=r.filter(g=>g.scopeType===e),p=u.sort((g,f)=>v(g.end)-v(f.end))[u.length-1];return p?{...p,bucketTons:o}:null}function hn(t,e,n){const s=m(t),o=m(e),a=m(n),r=o+a,c=pa(o,a),d=Number.parseInt(String(i.projectComplexityTier||"2"),10)||2,l=ct(i.admin.sections.detailing.values),u=Math.max(500,v(l.minimumFee)),p=c?ma(r,c,d):null,g=p?v(p.detailingPercent):0,f=i.pricingDetailing.detailingPercentOverride===null||i.pricingDetailing.detailingPercentOverride===void 0?null:m(i.pricingDetailing.detailingPercentOverride),k=f!==null?f:g,T=f!==null&&k===0,E=s>0?T?0:Math.max(s*(k/100),u):0,S=s+E;return i.pricingDetailing.detailingPercentAuto=g,i.pricingDetailing.detailingAmount=E,i.pricingDetailing.subtotal=s,i.pricingDetailing.finalTotal=S,{subtotal:s,deckTons:o,joistTons:a,totalTons:r,scopeType:c,tier:d,minimumFee:u,matchedBucket:p,autoPercent:g,overridePercent:f,appliedPercent:k,detailingAmount:E,finalTotal:S}}function ga(t){if(!t||t.subtotal<=0)return'<p class="help-text">No pricing subtotal in scope.</p>';const e=t.overridePercent!==null?`
      <button
        type="button"
        class="btn-secondary"
        data-action="pricing-detailing-reset-auto"
      >
        RESET TO AUTO
      </button>
    `:"";return`
    <div class="pricing-cogs-grid">
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Auto Detailing %</span><strong>${G(t.autoPercent)}%</strong></div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row">
          <span>Detailing %</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value="${G(t.appliedPercent)}"
            data-action="pricing-detailing-percent-input"
          />
        </div>
        ${e}
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Minimum Detailing Fee</span><strong>${h(t.minimumFee)}</strong></div>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Detailing Cost</span><strong>${h(t.detailingAmount)}</strong></div>
      </div>
    </div>
  `}function _e(){var l;const t=u=>Math.round(m(u)*100)/100,e=(((l=i.vendorPlan)==null?void 0:l.deckAssignments)||[]).filter(u=>u.vendor!=="TROJAN"&&u.tons>0),n=new Map;e.forEach(u=>{const p=String(u.vendor||"").trim().toUpperCase();n.has(p)||n.set(p,{vendor:p,tons:0,lbs:0,cost:0,pricingMode:"none",detail:""});const g=n.get(p);g.tons+=m(u.tons)});const s=Array.from(n.values()).map(u=>{if(u.tons=t(u.tons),u.lbs=u.tons*2e3,u.vendor==="CANO"){const p=v(i.admin.sections.cano.values.perLb);return u.cost=u.lbs*p,u.pricingMode="cano",u.detail=`${Y(u.lbs)} LB x ${M(p)}/LB`,u}if(u.vendor==="CSC"){const g=Yt({vendor:"CSC",scope:"DECK",tons:u.tons}).pricePerTon;return u.cost=u.tons*g,u.pricingMode="csc",u.detail=`${G(u.tons)} TONS x ${M(g)}/TON`,u}return u.cost=0,u.pricingMode="none",u.detail="No admin pricing configured for this supplier",u}),o=s.reduce((u,p)=>u+m(p.cost),0),a=s.reduce((u,p)=>u+m(p.tons),0),r=s.reduce((u,p)=>u+m(p.lbs),0);s.forEach(u=>{const p=rt(u.cost,"brokeredDeck");u.marginPercent=p.marginPercent,u.marginAmount=p.marginAmount,u.totalCost=u.cost+u.marginAmount});const c=s.reduce((u,p)=>u+m(p.marginAmount),0),d=o>0?c/o*100:It("brokeredDeck");return{hasBrokeredDeck:s.length>0,entries:s,subtotalCost:o,marginPercent:d,marginAmount:c,totalCost:o+c,totalTons:a,totalLbs:r}}function fa(t=null){const e=t||_e();return e.hasBrokeredDeck?`
    <div class="pricing-cogs-grid">
      ${e.entries.map(s=>`
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>${s.vendor} Deck Cost</span><strong>${h(s.cost)}</strong></div>
        <p class="pricing-cogs-meta">${s.detail}</p>
      </div>
    `).join("")}
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row">
          <span>Margin %</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value="${e.marginPercent}"
            data-action="pricing-margin-input"
            data-pricing-margin-section="brokeredDeck"
          />
        </div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Margin Amount</span><strong>${h(e.marginAmount)}</strong></div>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Total Supplier Deck Cost</span><strong>${h(e.totalCost)}</strong></div>
      </div>
    </div>
  `:'<p class="help-text">No supplier deck tons in scope.</p>'}function Ss(t,e){const n=String(t||"").trim().toUpperCase(),s=Math.round(m(e)*100)/100;if(s<=0||n!=="CSC"&&n!=="CANO")return{vendor:n,tons:0,subtotalCost:0,marginPercent:It("brokeredDeck"),marginAmount:0,totalCost:0,detail:"No supplier deck tons in scope"};if(n==="CANO"){const d=s*2e3,l=v(i.admin.sections.cano.values.perLb),u=d*l,p=rt(u,"brokeredDeck");return{vendor:n,tons:s,subtotalCost:u,marginPercent:p.marginPercent,marginAmount:p.marginAmount,totalCost:p.totalWithMargin,detail:`${Y(d)} LB x ${M(l)}/LB`}}const a=Yt({vendor:"CSC",scope:"DECK",tons:s}).pricePerTon,r=s*a,c=rt(r,"brokeredDeck");return{vendor:n,tons:s,subtotalCost:r,marginPercent:c.marginPercent,marginAmount:c.marginAmount,totalCost:c.totalWithMargin,detail:`${G(s)} TONS x ${M(a)}/TON`}}function vs(t,e){const n=String(t||"").trim().toUpperCase(),s=m(e);if(s<=0||n!=="CSC"&&n!=="CANO")return{vendor:n,tons:0,subtotalCost:0,surcharge:0,marginPercent:It("joists"),marginAmount:0,totalCost:0,detail:"No joist tons in scope"};if(n==="CANO"){const u=s*2e3,p=v(i.admin.sections.cano.values.perLb),g=u*p,f=rt(g,"joists");return{vendor:n,tons:s,subtotalCost:g,surcharge:0,marginPercent:f.marginPercent,marginAmount:f.marginAmount,totalCost:f.totalWithMargin,detail:`${Y(u)} LB x ${M(p)}/LB`}}const o=Yt({vendor:"CSC",scope:"JOISTS",tons:s}),a=o.pricePerTon,r=s*a,c=o.bucketStart===0&&o.bucketEnd===9?v(i.admin.sections.csc.values.joists.extraShippingFee_0_9):0,d=r+c,l=rt(d,"joists");return{vendor:n,tons:s,subtotalCost:d,surcharge:c,marginPercent:l.marginPercent,marginAmount:l.marginAmount,totalCost:l.totalWithMargin,detail:`${G(s)} TONS x ${M(a)}/TON`}}const ba=["TROJAN","CANO","CSC","CUTTING EDGE","CORDECK","CSM","HOUSTONBDECK"];function Ts(t,e){return!(!t||e.americanSteelRequired&&!t.americanSteelRequired||e.americanManufacturing&&!t.americanManufacturing||e.sdiManufacturer&&!t.sdiManufacturing)}function ka(t,e,n={}){var r,c;if(!t||!e||!Ts(t,n)||String(t.supplier||"").trim().toUpperCase()==="TROJAN"&&!he(e,n))return!1;const s=Number.parseFloat(String(((r=e.specs)==null?void 0:r.depth)||"").trim());if(!Number.isFinite(s)||!(t.depths||[]).some(d=>Math.abs(d-s)<1e-4))return!1;const a=Kt(String(((c=e.specs)==null?void 0:c.profile)||"").trim());return!a||!t.profileAvailability||!Object.prototype.hasOwnProperty.call(t.profileAvailability,a)?!0:!!t.profileAvailability[a]}function Ca(){const t=new Map;return Pi.forEach(e=>{const n=Qt(e);n.supplier&&t.set(n.supplier,n)}),t}function ge(t=null){const e=Array.isArray(t)?t:ye().map(r=>Qt(r)).filter(r=>r.supplier!==""),n=Ca(),s=e.map(r=>{if(!r||!r.supplier)return null;const c=n.get(r.supplier);return{...r,deck:!!r.deck,joists:!!r.joists,depths:Array.isArray(r.depths)&&r.depths.length>0?r.depths:(c==null?void 0:c.depths)||[],priority:Number.isFinite(r.priority)&&r.priority<Number.MAX_SAFE_INTEGER?r.priority:(c==null?void 0:c.priority)||Number.MAX_SAFE_INTEGER}}).filter(Boolean),o=new Map;s.forEach(r=>{const c=String(r.supplier||"").trim().toUpperCase();c&&(o.has(c)||o.set(c,[]),o.get(c).push(r))}),ba.forEach(r=>{!o.has(r)&&n.has(r)&&o.set(r,[{...n.get(r)}])});const a=Array.from(o.keys()).sort((r,c)=>{const d=Math.min(...(o.get(r)||[]).map(u=>Number.isFinite(u.priority)?u.priority:Number.MAX_SAFE_INTEGER)),l=Math.min(...(o.get(c)||[]).map(u=>Number.isFinite(u.priority)?u.priority:Number.MAX_SAFE_INTEGER));return d!==l?d-l:r.localeCompare(c)});return{rulesBySupplier:o,vendors:a}}function Gn(t={}){const e=(t.deckLines||[]).filter(r=>m(r.rowTons)>0),n=Math.round(e.reduce((r,c)=>r+m(c.rowTons),0)*100)/100,s=m(t.joistTons),o={...t.flags||{}},a=String(o.specifiedManufacturerName||"").trim().toUpperCase();return{deckLines:e,deckTons:n,joistTons:s,flags:o,specifiedManufacturerName:a,hasDeckScope:n>0,hasJoistScope:s>0}}function Es(t){const e=ge(t);return e.vendors.filter(n=>(e.rulesBySupplier.get(n)||[]).some(s=>s.deck))}function Ns(t){const e=ge(t);return e.vendors.filter(n=>(e.rulesBySupplier.get(n)||[]).some(s=>s.joists))}function Sa(t,e,n){const s=String(t||"").trim().toUpperCase(),o=m(e);if(o<=0)return!0;if(s==="TROJAN"){const r=Xt(o);return m(r.totalCogs)>0||m(r.totalWithMargin)>0}if(s==="CSC"||s==="CANO"){const r=Ss(s,o);return m(r.subtotalCost)>0||m(r.totalCost)>0}const a=Ot(s,o,n);return m(a)>0}function va(t,e,n,s){const o=String(t||"").trim().toUpperCase(),a=s.rulesBySupplier.get(o)||[];return a.length===0?!1:a.some(r=>r.deck&&ka(r,e,n.flags))}function sn(t,e,n,s,o,a=null){if(!Array.isArray(t)||t.length===0)return[];const r=t.reduce((l,u)=>l+m(u.rowTons),0),c=a?new Set(a.map(l=>String(l||"").trim().toUpperCase())):null,d=(o==null?void 0:o.pricedDeckSuppliers)||new Set;return n.vendors.filter(l=>!d.has(l)||c&&!c.has(l)||!t.every(p=>va(l,p,e,n))?!1:Sa(l,r,s))}function Ta(t,e,n){return(t||[]).map((s,o)=>{var d;const a=m(s.rowTons),r=String(e.get(s.id)||"").trim().toUpperCase(),c=Ot(r,a,n);return{lineId:s.id,lineIndex:o,profile:s.profileName||((d=s.specs)==null?void 0:d.profile)||"",sqs:m(s.rowSqs),vendor:r,reason:"Optimization scenario selection",tons:a,pricePerTon:c,extendedTotal:a*c}})}function As(t,e,n,s){if(!t.hasDeckScope)return[{deckMode:"auto",deckVendor:"",deckAssignments:[],deckBreakdown:null}];const o=t.flags.specifiedManufacturer&&t.specifiedManufacturerName?[t.specifiedManufacturerName]:null,a=t.deckLines,r=a.filter(p=>he(p,t.flags)),c=a.filter(p=>!he(p,t.flags)),d=new Map;function l(p){const g=Ta(a,p,n);if(g.some(E=>!E.vendor))return;const f=ha(g);if(!f.entries.length||m(f.totalCost)<=0)return;const k=g.map(E=>`${E.lineId}:${E.vendor}`).sort().join("|");if(d.has(k))return;const T=Array.from(new Set(g.map(E=>E.vendor))).sort();d.set(k,{deckMode:T.length>1?"mix":"single",deckVendor:T.length===1?T[0]:"",deckAssignments:g,deckBreakdown:f})}if(sn(a,t,e,n,s,o).forEach(p=>{const g=new Map(a.map(f=>[f.id,p]));l(g)}),r.length>0&&c.length>0){const p=sn(r,t,e,n,s,o),g=sn(c,t,e,n,s,o);p.forEach(f=>{g.forEach(k=>{const T=new Map;r.forEach(E=>T.set(E.id,f)),c.forEach(E=>T.set(E.id,k)),l(T)})})}return Array.from(d.values())}function ys(t,e,n){if(!t.hasJoistScope)return[""];const s=(n==null?void 0:n.pricedJoistSuppliers)||new Set;return e.vendors.filter(o=>{if(!s.has(o)||!(e.rulesBySupplier.get(o)||[]).some(d=>d.joists&&Ts(d,t.flags)))return!1;const c=vs(o,t.joistTons);return m(c.subtotalCost)>0||m(c.totalCost)>0})}function hs(t,e,n,s=[]){const o=ge(n),a=mt(),r=Ln(a),c=Gn({deckLines:t,joistTons:0,flags:e}),d=new Set((s||[]).map(p=>String(p||"").trim().toUpperCase())),l=As(c,o,a,r),u=new Set;return l.forEach(p=>{(p.deckAssignments||[]).forEach(g=>{g.vendor&&u.add(String(g.vendor).trim().toUpperCase())})}),Array.from(u.values()).filter(p=>d.size===0||d.has(p))}function Gs(t,e,n=[]){const s=ge(e),o=Ln(mt()),a=new Set((n||[]).map(c=>String(c||"").trim().toUpperCase()));return ys(Gn({deckLines:[],joistTons:m(i.joists.tons),flags:t}),s,o).filter(c=>a.size===0||a.has(c))}function Ea(t,e,n){const s=[];return((t==null?void 0:t.entries)||[]).filter(a=>m(a.tons)>0).sort((a,r)=>{const c=a.vendor==="TROJAN"?0:1,d=r.vendor==="TROJAN"?0:1;return c!==d?c-d:String(a.vendor||"").localeCompare(String(r.vendor||""))}).forEach(a=>{s.push(`${a.vendor} DECK`)}),n&&e&&s.push(`${e} JOIST`),s.join(" + ")}function mt(){return{trojan:{...i.admin.sections.trojan.values},csc:de(i.admin.sections.csc.values),cano:Re(i.admin.sections.cano.values)}}function Ls(){return $t({trojan:i.admin.sections.trojan.values.leadTimes,csc:i.admin.sections.csc.values.leadTimes,cano:i.admin.sections.cano.values.leadTimes})}function Na(t,e){const n=String(e||"").trim().toLowerCase(),s=n!=="joistonly"&&n!=="joist_only",o=n!=="deckonly"&&n!=="deck_only",a=new Set,r=new Set,c=Array.isArray(t==null?void 0:t.deckSuppliers)?t.deckSuppliers:t!=null&&t.deckSupplier?[t.deckSupplier]:[],d=Array.isArray(t==null?void 0:t.joistSuppliers)?t.joistSuppliers:t!=null&&t.joistSupplier?[t.joistSupplier]:[];return s&&c.forEach(l=>{const u=String(l||"").trim().toUpperCase();qt.includes(u)&&a.add(u)}),o&&d.forEach(l=>{const u=String(l||"").trim().toUpperCase();u!=="TROJAN"&&qt.includes(u)&&r.add(u)}),{deckSuppliers:[...a],joistSuppliers:[...r],includeDeck:s,includeJoists:o}}function js(t,e={}){var r,c,d,l;const n=$t(t),s=!!e.hasJoistScope,o=m(e.totalTons);let a="submittalsDeckOnly";return s&&(a=o>=50?"submittalsDeckAndJoistsOver50":"submittalsJoistsUnder50"),{min:U((c=(r=n.trojan)==null?void 0:r[a])==null?void 0:c.min),max:U((l=(d=n.trojan)==null?void 0:d[a])==null?void 0:l.max),key:a}}function Is({supplierSelections:t,specType:e,scopeType:n,leadTimesConfig:s}){const o=Na(t,n),a=$t(s),r=(e==null?void 0:e.submittalsRequired)!==!1;(e==null?void 0:e.hasDeckScope)??o.includeDeck;const c=!!((e==null?void 0:e.hasJoistScope)??o.includeJoists),d=m(e==null?void 0:e.totalTons),l=[];if(r){const k=js(a,{hasJoistScope:c,totalTons:d});k.min!==""&&k.max!==""&&l.push({source:"TROJAN",component:"Submittals",min:k.min,max:k.max,rule:k.key})}const u=new Set;o.deckSuppliers.forEach(k=>u.add(k)),o.joistSuppliers.forEach(k=>u.add(k)),u.forEach(k=>{var C,b,y,L;const T=k.toLowerCase(),E=U((b=(C=a[T])==null?void 0:C.fabrication)==null?void 0:b.min),S=U((L=(y=a[T])==null?void 0:y.fabrication)==null?void 0:L.max);E!==""&&S!==""&&l.push({source:k,component:"Fabrication",min:E,max:S})});const p=[];let g=null,f=null;return l.forEach(k=>{p.push(k),g=g===null?k.min:Math.max(g,k.min),f=f===null?k.max:Math.max(f,k.max)}),{min:g===null?"":g,max:f===null?"":f,breakdown:p}}function pn(t){const e=U(t==null?void 0:t.min),n=U(t==null?void 0:t.max);return e===""||n===""?"":`${e}-${n} WEEKS`}function Aa(){var d,l;const t=new Set;(((d=i.vendorPlan)==null?void 0:d.deckAssignments)||[]).forEach(u=>{if(m(u==null?void 0:u.tons)<=0)return;const p=String((u==null?void 0:u.vendor)||"").trim().toUpperCase();qt.includes(p)&&t.add(p)});const e=new Set;if(m(i.joists.tons)>0){const u=String(((l=i.vendorPlan)==null?void 0:l.chosenJoistVendor)||i.joists.supplier||"").trim().toUpperCase();qt.includes(u)&&e.add(u)}const s=t.size>0&&e.size>0?"deckAndJoist":t.size>0?"deckOnly":e.size>0?"joistOnly":"deckAndJoist",o=Ls(),a=m(i.totals.totalDeckTons)+m(i.joists.tons),r=Is({supplierSelections:{deckSuppliers:[...t],joistSuppliers:[...e]},specType:{submittalsRequired:!0,hasDeckScope:t.size>0,hasJoistScope:e.size>0,totalTons:a},scopeType:s,leadTimesConfig:o}),c=js(o,{hasDeckScope:t.size>0,hasJoistScope:e.size>0,totalTons:a});i.submittalsLeadTime=pn(c),i.fabricationLeadTime=pn(r),tt&&(tt.value=i.submittalsLeadTime),et&&(et.value=i.fabricationLeadTime)}function Ln(t=mt()){var g,f,k,T,E,S,C,b,y,L;const e=new Set,n=new Set,s=new Set,o=v((g=t.trojan)==null?void 0:g.coilCostPerLb),a=v((f=t.trojan)==null?void 0:f.inboundFreightPerLb),r=v((k=t.trojan)==null?void 0:k.laborPerLb);(o>0||a>0||r>0)&&e.add("TROJAN");const c=v((T=t.trojan)==null?void 0:T.accessoriesCostPerScrew),d=v((E=t.trojan)==null?void 0:E.accessoriesCostPerTon);return(c>0||d>0)&&s.add("TROJAN"),(((C=(S=t.csc)==null?void 0:S.deck)==null?void 0:C.buckets)||[]).some(j=>v(j==null?void 0:j.cost)>0)&&e.add("CSC"),(((y=(b=t.csc)==null?void 0:b.joists)==null?void 0:y.buckets)||[]).some(j=>v(j==null?void 0:j.cost)>0)&&n.add("CSC"),v((L=t.cano)==null?void 0:L.perLb)>0&&(e.add("CANO"),n.add("CANO")),{pricedDeckSuppliers:e,pricedJoistSuppliers:n,pricedAccessorySuppliers:s}}function ya(t,e){const n=String(t||"").trim().toUpperCase(),s=m(e);if(s<=0)return{vendor:n,tons:0,subtotalCost:0,marginPercent:It("brokeredDeck"),marginAmount:0,totalCost:0,detail:"No supplier deck tons in scope"};if(n==="TROJAN"){const d=Xt(s);return{vendor:"TROJAN",tons:s,subtotalCost:d.totalCogs,marginPercent:d.marginPercent,marginAmount:d.marginAmount,totalCost:d.totalWithMargin,detail:`${Y(d.lbs)} LB total production + freight`}}if(n==="CANO"||n==="CSC")return Ss(n,e);const o=mt(),a=Ot(n,s,o);if(m(a)<=0)return{vendor:n,tons:s,subtotalCost:0,marginPercent:It("brokeredDeck"),marginAmount:0,totalCost:0,detail:"No admin pricing configured for this supplier"};const r=s*a,c=rt(r,"brokeredDeck");return{vendor:n,tons:s,subtotalCost:r,marginPercent:c.marginPercent,marginAmount:c.marginAmount,totalCost:c.totalWithMargin,detail:`${G(s)} TONS x ${M(a)}/TON`}}function ha(t){const e=new Map;(t||[]).forEach(c=>{const d=m(c.tons);if(d<=0)return;const l=String(c.vendor||"").trim().toUpperCase();e.set(l,(e.get(l)||0)+d)});const n=Array.from(e.entries()).map(([c,d])=>ya(c,d)),s=n.reduce((c,d)=>c+m(d.totalCost),0),o=n.reduce((c,d)=>c+m(d.marginAmount),0),a=n.reduce((c,d)=>c+m(d.tons),0),r=n.map(c=>`${c.vendor}: ${c.detail}`).join(" | ");return{vendor:n.length===1?n[0].vendor:"MIXED",tons:a,marginAmount:o,totalCost:s,detail:r,entries:n}}function Ga(t,e){const n=[];((t==null?void 0:t.entries)||[]).forEach(s=>{n.push({supplier:String(s.vendor||"").trim().toUpperCase(),subtotalCost:m(s.subtotalCost),marginAmount:m(s.marginAmount),locked:String(s.vendor||"").trim().toUpperCase()==="TROJAN"?!!i.pricingMarginOverrides.trojanDeck:!!i.pricingMarginOverrides.brokeredDeck,sync:o=>{s.marginAmount=o,s.marginPercent=s.subtotalCost>0?o/s.subtotalCost*100:s.marginPercent,s.totalCost=s.subtotalCost+s.marginAmount}})}),e&&n.push({supplier:String(e.vendor||"").trim().toUpperCase(),subtotalCost:m(e.subtotalCost),marginAmount:m(e.marginAmount),locked:!!i.pricingMarginOverrides.joists,sync:s=>{e.marginAmount=s,e.marginPercent=e.subtotalCost>0?s/e.subtotalCost*100:e.marginPercent,e.totalCost=e.subtotalCost+e.marginAmount}}),Vi(n,vn()),t&&(t.marginAmount=(t.entries||[]).reduce((s,o)=>s+m(o.marginAmount),0),t.totalCost=(t.entries||[]).reduce((s,o)=>s+m(o.totalCost),0),t.detail=(t.entries||[]).map(s=>`${s.vendor}: ${s.detail}`).join(" | "))}function La(t,e,n){const s=me().totalCogs||0,o=Ln(n),a=As(t,e,n,o),r=ys(t,e,o),c=new Map;return a.forEach(d=>{r.forEach(l=>{if(t.hasJoistScope&&!l)return;const u=l?vs(l,t.joistTons):null;if(t.hasJoistScope&&m(u==null?void 0:u.totalCost)<=0)return;const p=d.deckBreakdown;Ga(p,u);const g=Ea(p,l,t.hasJoistScope);if(!g)return;const k=`${(d.deckAssignments||[]).map(j=>`${j.lineId}:${j.vendor}`).sort().join("|")}::JOIST:${l||""}`;if(c.has(k)||[...new Set((d.deckAssignments||[]).map(j=>j.vendor))].some(j=>!o.pricedDeckSuppliers.has(j))||l&&!o.pricedJoistSuppliers.has(l))return;const E=((p==null?void 0:p.totalCost)||0)+((u==null?void 0:u.totalCost)||0)+s;if(m(E)<=0)return;const S=((p==null?void 0:p.marginAmount)||0)+((u==null?void 0:u.marginAmount)||0),C=Array.from(new Set((d.deckAssignments||[]).filter(j=>m(j.tons)>0).map(j=>String(j.vendor||"").trim().toUpperCase()).filter(j=>qt.includes(j)))),b=l&&qt.includes(String(l).trim().toUpperCase())?[String(l).trim().toUpperCase()]:[],y=C.length>0&&b.length>0?"deckAndJoist":C.length>0?"deckOnly":b.length>0?"joistOnly":"deckAndJoist",L=Is({supplierSelections:{deckSuppliers:C,joistSuppliers:b},specType:{submittalsRequired:!0,hasDeckScope:t.hasDeckScope,hasJoistScope:t.hasJoistScope,totalTons:m(t.deckTons)+m(t.joistTons)},scopeType:y,leadTimesConfig:Ls()});c.set(k,{label:g,deckVendor:d.deckVendor||"",deckMode:d.deckMode||"auto",deckAssignments:Array.isArray(d.deckAssignments)?d.deckAssignments:[],joistVendor:l||"",deckBreakdown:p,joistBreakdown:u,accessoriesCost:s,totalCost:E,marginAmount:S,leadTimeRange:L})})}),Array.from(c.values()).sort((d,l)=>d.totalCost!==l.totalCost?d.totalCost-l.totalCost:l.marginAmount-d.marginAmount)}function ja(){const t=Gn({deckLines:i.deckProfiles||[],joistTons:i.joists.tons,flags:i.deckFlags||{}}),e=ye().map(c=>Qt(c)).filter(c=>c.supplier!==""),n=ge(e),s=mt(),o=hs(t.deckLines,t.flags,e,Es(e)),a=Gs(t.flags,e,Ns(e)),r=La(t,n,s);return{hasComparableScope:t.hasDeckScope||t.hasJoistScope,deckTons:t.deckTons,joistTons:t.joistTons,eligibleDeckVendors:o,eligibleJoistVendors:a,scenarios:r,bestScenario:r[0]||null}}function ae(){if(!dt)return;if(Bt&&(Bt.classList.toggle("is-loading",!!i.pricingOptimizationLoading),Bt.setAttribute("aria-label",i.pricingOptimizationLoading?"Optimizing":"Optimize")),!i.pricingOptimizationVisible){dt.classList.add("hidden"),dt.innerHTML="";return}if(i.pricingOptimizationLoading){dt.classList.remove("hidden"),dt.innerHTML='<p class="help-text pricing-optimize-loading-text">CRUNCHING NUMBERS...</p>';return}const t=ja();if(i.pricingOptimizationScenarios=t.scenarios,!t.hasComparableScope||t.scenarios.length===0){const n=t.deckTons>0&&t.eligibleDeckVendors.length===0?"No deck supplier option meets current supplier-list specs/product rules with available pricing.":"",s=t.joistTons>0&&t.eligibleJoistVendors.length===0?"No joist supplier option meets current supplier-list specs/product rules with available pricing.":"",o=[n,s].filter(Boolean).join(" ");dt.classList.remove("hidden"),dt.innerHTML=`<p class="help-text">${o||"No valid supplier setup available for current scope/specs with configured pricing."}</p>`;return}const e=t.scenarios.map((n,s)=>{const o=s===0,a=i.appliedOptimizationSelection.label!==""&&i.appliedOptimizationSelection.label===n.label&&i.appliedOptimizationSelection.deckMode===(n.deckMode||"auto")&&i.appliedOptimizationSelection.deckVendor===(n.deckVendor||"")&&i.appliedOptimizationSelection.joistVendor===(n.joistVendor||""),r=n.deckBreakdown&&Number.isFinite(n.deckBreakdown.marginPercent)?` | MARGIN ${G(n.deckBreakdown.marginPercent)}%`:n.deckBreakdown?` | MARGIN ${h(n.deckBreakdown.marginAmount||0)}`:"",c=n.deckBreakdown&&Array.isArray(n.deckBreakdown.entries)?n.deckBreakdown.entries.map(p=>{const g=Number.isFinite(p.marginPercent)?` | MARGIN ${G(p.marginPercent)}%`:` | MARGIN ${h(p.marginAmount||0)}`;return`
                  <p class="pricing-line-item-meta">
                    DECK (${p.vendor}): ${p.detail}${g}
                    | TOTAL ${h(p.totalCost)}
                  </p>
                `}).join(""):n.deckBreakdown?`
              <p class="pricing-line-item-meta">
                DECK (${n.deckBreakdown.vendor}): ${n.deckBreakdown.detail}${r}
                | TOTAL ${h(n.deckBreakdown.totalCost)}
              </p>
            `:"",d=n.joistBreakdown&&n.joistBreakdown.surcharge>0?` | SURCHARGE ${h(n.joistBreakdown.surcharge)}`:"",l=n.joistBreakdown?`
          <p class="pricing-line-item-meta">
            JOISTS (${n.joistBreakdown.vendor}): ${n.joistBreakdown.detail}${d}
            | MARGIN ${G(n.joistBreakdown.marginPercent)}%
            | TOTAL ${h(n.joistBreakdown.totalCost)}
          </p>
        `:"",u=n.leadTimeRange?`<p class="pricing-line-item-meta">LEAD TIME: ${pn(n.leadTimeRange)||"N/A"}</p>`:"";return`
        <div class="pricing-line-item ${o?"pricing-optimization-best":""}">
          <div class="pricing-line-item-main">
            <span>OPTION: ${n.label}</span>
            <strong>${h(n.totalCost)}</strong>
          </div>
          <div class="pricing-option-secondary">
            <p class="pricing-line-item-meta pricing-line-item-meta-margin">
              <span>TOTAL MARGIN:</span>
              <span>${h(n.marginAmount||0)}</span>
            </p>
            <span></span>
          </div>
          <div class="pricing-optimization-actions">
            <button
              type="button"
              class="btn-secondary"
              data-action="apply-optimized-option"
              data-optimization-index="${s}"
            >
              ${a?"APPLIED":"APPLY"}
            </button>
          </div>
          ${c}
          ${l}
          ${u}
        </div>
      `}).join("");dt.classList.remove("hidden"),dt.innerHTML=`
    <div class="pricing-project-summary">
      <div class="pricing-line-item">
        <div class="pricing-line-item-main">
          <span>OPTIMIZATION SUMMARY</span>
          <span>PROJECT PRICE</span>
        </div>
      </div>
      ${e}
    </div>
  `}function Ia(t){const e=i.pricingOptimizationScenarios[t];e&&(i.appliedOptimizationSelection={deckMode:e.deckMode||"auto",deckVendor:e.deckVendor||"",deckAssignments:Array.isArray(e.deckAssignments)?e.deckAssignments.map(n=>({lineId:n.lineId,vendor:String(n.vendor||"").trim().toUpperCase()})):[],joistVendor:e.joistVendor||"",label:e.label||""},i.pricingOptimizationVisible=!1,I())}function Ti(t){const e=t instanceof Date?t:new Date,n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0"),o=e.getFullYear();return`${n}/${s}/${o}`}function Oa(t){const e=Number.isFinite(t)&&t>0?Math.floor(t):on;return`${$s}${String(e).padStart(6,"0")}`}function Pa(){try{const t=window.localStorage.getItem(Mn),e=Number.parseInt(String(t??""),10),n=Number.isFinite(e)&&e>=on?e:on,s=Oa(n),o=window.localStorage.getItem(Rn),a=JSON.parse(o||"[]"),r=Array.isArray(a)?a:[];return r.push({quoteRef:s,generatedAt:new Date().toISOString(),projectName:i.projectName||"",location:i.projectLocation||""}),window.localStorage.setItem(Mn,String(n+1)),window.localStorage.setItem(Rn,JSON.stringify(r)),s}catch{return`TROJ-${Date.now().toString().slice(-8)}`}}function $a(t={}){var O;const e=String(t.quoteRef||"").trim(),n=new Date,s=new Date(n);s.setDate(s.getDate()+30);const o=new Map((((O=i.vendorPlan)==null?void 0:O.deckAssignments)||[]).map(A=>[A.lineId,A])),a=(i.deckProfiles||[]).filter(A=>m(A.rowTons)>0||m(A.rowSqs)>0).map(A=>{const B=o.get(A.id),H=m(A.rowTons),K=m(A.rowSqs),_=m(B==null?void 0:B.pricePerTon);return{type:xe(A)||A.specs.profile||"Deck",sqs:K,tons:H,manufacturer:String(A.specs.manufacturer||(B==null?void 0:B.vendor)||"").trim(),pricePerTon:_,extended:H*_}}),r=Je(),c=m(i.joists.tons),d=c>0?r.baseCost/c:0,l=(i.joistItems||[]).filter(A=>m(A.tons)>0).map(A=>{const B=m(A.tons),H=m(A.units);return{description:A.series||"Joist",units:H,tons:B,manufacturer:String(i.joists.supplier||"").trim(),pricePerTon:d,extended:B*d}});r.surcharge>0&&l.push({description:"CSC Surcharge (<10 tons)",units:0,tons:0,manufacturer:"CSC",pricePerTon:0,extended:r.surcharge});const u=(i.accessories||[]).map((A,B)=>({type:(A.type||`ACCESSORY #${B+1}`).toUpperCase(),screwCount:Number.isFinite(A.screwCount)?A.screwCount:0,tons:m(A.tons)})).filter(A=>A.screwCount>0||A.tons>0),p=Xt(),g=_e();Cs(p,g,r);const f=p.totalWithMargin||0,k=g.totalCost||0,T=me().totalCogs||0,E=r.totalCost||0,S=m(i.totals.totalDeckTons),C=m(i.joists.tons),b=f+k+T+E,L=hn(b,S,C).finalTotal,j=m(p.marginAmount),w=m(p.marginPercent),X=m(g.marginAmount)+m(r.marginAmount),Q=m(g.subtotalCost)+m(r.subtotalCost),it=Q>0?X/Q*100:0,st=j+X,N=L>0?st/L*100:0;return{quoteRef:e||`TROJ-${Date.now().toString().slice(-8)}`,proposalDate:Ti(n),validUntilDate:Ti(s),projectName:i.projectName||"PROJECT",locationText:i.projectLocation||"",submittalsLeadTime:i.submittalsLeadTime||"",fabricationLeadTime:i.fabricationLeadTime||"",takeoffByTrojan:i.takeoffByTrojan||"YES",cutListProvided:i.cutListProvided||"NO",specsReviewed:i.specsReviewed||"NO",documentConditions:gn(i.admin.sections.trojan.values.documentConditions),contactName:"Trojan Steel Team",contactPhone:"",contactEmail:"",deckLines:a,accessoriesLines:u,joistLines:l,totals:{totalTons:S+C,totalDeckTons:S,totalJoistTons:C,grandTotal:L},margins:{trojan:{amount:j,percent:w},broker:{amount:X,percent:it},total:{amount:st,blendedPercent:N}}}}function jn(){try{$();const t=Pa(),e=$a({quoteRef:t});window.localStorage.setItem(Gi,JSON.stringify(e));const n=String(e.projectName||"project").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80)||"project",s=String(e.quoteRef||"proposal").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80)||"proposal",o="/proposal-api/health",a="/proposal-api/render";fetch(o).then(async r=>{if(!r.ok){const d=(await r.text()).slice(0,200);throw new Error(`Health check failed at ${o} | status ${r.status} | body: ${d}`)}const c=await r.json().catch(()=>null);if(!c||c.ok!==!0)throw new Error(`Health endpoint returned unexpected payload at ${o}`)}).then(()=>fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({proposalData:e})})).then(async r=>{if(!r.ok){const c=(await r.text()).slice(0,200);throw new Error(`PDF server error at ${a} | status ${r.status} | body: ${c}`)}return r.blob()}).then(r=>{const c=URL.createObjectURL(r),d=document.createElement("a");d.href=c,d.download=`${n}-${s}.pdf`,document.body.appendChild(d),d.click(),d.remove(),window.setTimeout(()=>URL.revokeObjectURL(c),1e3)}).catch(r=>{const c=(r==null?void 0:r.message)||String(r);console.error("Failed to generate proposal PDF",{message:c,proposalApiUrl:a,healthUrl:o,error:r}),window.alert(`Unable to download PDF.
Health URL: ${o}
PDF URL: ${a}
Error: ${c}
Hint: run npm run dev:all and verify /proposal-api/health returns { ok: true }.`)})}catch(t){console.error("Failed to generate proposal",t),window.alert("Unable to generate proposal. Check console for details.")}}function Pt(){var f,k,T,E,S,C;if(!be||!Xe||!Qe||!Ze||!tn)return;const t=i.scope==="deck-only"||i.scope==="joist-deck",e=i.scope==="joists-only"||i.scope==="joist-deck",n=(((f=i.vendorPlan)==null?void 0:f.deckAssignments)||[]).some(b=>b.vendor==="TROJAN"),s=(((k=i.vendorPlan)==null?void 0:k.deckAssignments)||[]).some(b=>b.vendor!=="TROJAN");be.classList.toggle("hidden",!n);const o=Array.from(new Set((((T=i.vendorPlan)==null?void 0:T.deckAssignments)||[]).filter(b=>b.vendor!=="TROJAN").map(b=>String(b.vendor||"").trim()).filter(Boolean))),a=Array.from(new Set((i.deckProfiles||[]).map(b=>{var y;return String(((y=b==null?void 0:b.specs)==null?void 0:y.manufacturer)||"").trim().toUpperCase()}).filter(b=>b!==""&&b!=="TROJAN")));if(ti){const b=o.length>0?o:a;ti.textContent=b.length===0?"SUPPLIER DECK":b.length===1?`${b[0]} DECK`:`${b.join(" + ")} DECK`}if(ei){const b=String(((C=(S=(E=i.vendorPlan)==null?void 0:E.pricingSchedule)==null?void 0:S.joists)==null?void 0:C.vendor)||"").trim();ei.textContent=b?`${b} JOISTS`:"JOISTS"}const r=Xt();be.classList.toggle("hidden",!(t&&n));const c=me();if(ii){const b=!!i.pricingSections.accessories;ii.textContent=b&&c.hasAccessories?h(c.totalCogs):""}const d=_e(),l=Je();if(Cs(r,d,l),ni){const b=!!i.pricingSections.trojanDeck;ni.textContent=b&&r.hasTrojanDeck?h(r.totalWithMargin):""}if(si){const b=!!i.pricingSections.brokeredDeck;si.textContent=b&&d.hasBrokeredDeck?h(d.totalCost):""}if(oi){const b=!!i.pricingSections.joists;oi.textContent=b&&l.hasJoists?h(l.totalCost):""}const u=(r.totalWithMargin||0)+(c.totalCogs||0)+(d.totalCost||0)+(l.totalCost||0),p=hn(u,m(i.totals.totalDeckTons),m(i.joists.tons));if(ai){const b=!!i.pricingSections.detailing;ai.textContent=b&&p.subtotal>0?h(p.detailingAmount):""}if(ci&&(ci.textContent=h(p.subtotal)),di&&(di.textContent=h(p.finalTotal)),li){const b=p.finalTotal,y=r.hasTrojanDeck&&r.marginAmount>0?m(r.marginAmount):0,L=r.hasTrojanDeck?m(r.totalCogs):0,j=L>0?y/L*100:0,w=d.hasBrokeredDeck?m(d.marginAmount):0,X=l.hasJoists?m(l.marginAmount):0,Q=w+X,it=(d.hasBrokeredDeck?m(d.subtotalCost):0)+(l.hasJoists?m(l.subtotalCost):0),st=it>0?Q/it*100:0,N=y+Q,O=b>0?N/b*100:0,A=[];y>0&&A.push(`
        <div class="pricing-margin-summary-row">
          <div class="pricing-margin-summary-main">
            <span>TROJAN MARGIN</span>
            <strong>${h(y)} (${G(j)}%)</strong>
          </div>
        </div>
      `),Q>0&&A.push(`
        <div class="pricing-margin-summary-row">
          <div class="pricing-margin-summary-main">
            <span>BROKER MARGIN</span>
            <strong>${h(Q)} (${G(st)}%)</strong>
          </div>
        </div>
      `),N>0&&A.push(`
        <div class="pricing-margin-summary-row pricing-margin-summary-total">
          <div class="pricing-margin-summary-main">
            <span>TOTAL MARGIN</span>
            <strong>${h(N)} (${G(O)}%)</strong>
          </div>
        </div>
      `),li.innerHTML=A.length>0?`<div class="pricing-margin-summary">${A.join("")}</div>`:""}Xe.classList.toggle("hidden",!(t&&c.hasAccessories)),Qe.classList.toggle("hidden",!(t&&s)),Ze.classList.toggle("hidden",!e),tn.classList.toggle("hidden",!(t||e));const g={trojanDeck:{section:be,content:eo},accessories:{section:Xe,content:io},brokeredDeck:{section:Qe,content:no},joists:{section:Ze,content:so},detailing:{section:tn,content:oo}};Object.keys(g).forEach(b=>{const y=g[b],L=!!i.pricingSections[b];if(!y.content||!y.section)return;y.content.classList.toggle("hidden",L);const j=y.section.querySelector(".pricing-accordion-header"),w=j==null?void 0:j.querySelector(".deck-summary-toggle");j&&j.setAttribute("aria-expanded",String(!L)),w&&(w.textContent=L?"+":"−")}),Qn&&(Qn.innerHTML=da(r)),ui&&(ui.innerHTML=""),Xn&&(Xn.innerHTML=fa(d)),pi&&(pi.innerHTML=la()),Zn&&(Zn.innerHTML=ua(l)),mi&&(mi.innerHTML=ga(p)),ae()}function Da(){var g;const t={trojan:{...i.admin.sections.trojan.values},csc:de(i.admin.sections.csc.values),cano:Re(i.admin.sections.cano.values)},e=es({scope:i.scope,projectLocation:i.projectLocation,deckFlags:i.deckFlags,supplierRules:ye(),deckLines:i.deckProfiles.map(f=>({id:f.id,specs:f.specs,rowTons:f.rowTons,rowSqs:f.rowSqs,profileName:xe(f)})),joistTons:i.joists.tons},t),n=ye().map(f=>Qt(f)).filter(f=>f.supplier!==""),s=i.deckProfiles.filter(f=>m(f.rowTons)>0),o=hs(s,i.deckFlags||{},n,Es(n)),a=Gs(i.deckFlags||{},n,Ns(n)),r=String(i.appliedOptimizationSelection.deckMode||"auto").trim().toLowerCase(),c=String(i.appliedOptimizationSelection.deckVendor||"").trim().toUpperCase(),d=r==="single"&&c!==""&&o.includes(c),l=Array.isArray(i.appliedOptimizationSelection.deckAssignments)&&r==="mix"?i.appliedOptimizationSelection.deckAssignments:[],u=new Map(l.map(f=>[Number(f.lineId),String(f.vendor||"").trim().toUpperCase()]));if(d){const f=mt();e.deckAssignments.forEach(k=>{k.vendor=c,k.reason="Optimization selection override",k.pricePerTon=Ot(c,m(k.tons),f),k.extendedTotal=m(k.tons)*m(k.pricePerTon)})}else if(r==="mix"&&u.size>0){const f=mt();e.deckAssignments.forEach(k=>{const T=u.get(Number(k.lineId));if(!T)return;const E=gt(k.lineId),S=T==="TROJAN"&&he(E,i.deckFlags||{}),C=T!=="TROJAN"&&o.includes(T);!S&&!C||(k.vendor=T,k.reason="Optimization mix override",k.pricePerTon=Ot(T,m(k.tons),f),k.extendedTotal=m(k.tons)*m(k.pricePerTon))})}else r==="single"&&c!==""?(i.appliedOptimizationSelection.deckMode="auto",i.appliedOptimizationSelection.deckVendor=""):r==="mix"&&u.size>0&&(i.appliedOptimizationSelection.deckMode="auto",i.appliedOptimizationSelection.deckAssignments=[]);const p=String(i.appliedOptimizationSelection.joistVendor||"").trim().toUpperCase();p!==""&&a.includes(p)?(e.chosenJoistVendor=p,(g=e.pricingSchedule)!=null&&g.joists&&(e.pricingSchedule.joists.vendor=p)):p!==""&&(i.appliedOptimizationSelection.joistVendor=""),e.deckAssignments.forEach(f=>{const k=gt(f.lineId);if(!k)return;const T=f.vendor;k.specs.manufacturer=Mo(T),k.manufacturerExplicit=!1}),(i.scope==="joists-only"||i.scope==="joist-deck")&&e.chosenJoistVendor&&(i.joists.supplier=e.chosenJoistVendor,ce.value=i.joists.supplier),i.vendorPlan=e,i.totals.trojanDeckTons=e.rollups.trojanDeckTons,i.totals.brokeredDeckTons=e.rollups.brokeredDeckTons,i.totals.deckTotal=e.deckAssignments.reduce((f,k)=>f+k.extendedTotal,0)}function I(){oa(),Da(),Aa(),i.totals.joistsTotal=aa();const t=ra();i.totals.trojanShipping=t.cost,i.totals.trojanShippingTrucks=t.trucks,i.totals.trojanShippingMiles=t.miles,i.totals.trojanShippingRate=t.rate;const e=(Xt().totalWithMargin||0)+(me().totalCogs||0)+(_e().totalCost||0)+(Je().totalCost||0);i.totals.grandTotal=hn(e,m(i.totals.totalDeckTons),m(i.joists.tons)).finalTotal,Wn&&(Wn.value=G(i.totals.trojanDeckTons||0)),Yn&&(Yn.value=G(i.totals.brokeredDeckTons||0)),Ji.value=h(i.totals.deckTotal),Wt(),Go(),Yi(),ca(),Pt()}function gt(t){return i.deckProfiles.find(e=>e.id===t)}function Os(t){if(!(!t||!t.startsWith("p_")))return gt(Number(t.slice(2)))}function Ma(t){const e=t.target;if(!(e instanceof Element))return;if(e.closest(".btn-add-profile")){const r=Ge();i.deckProfiles.push(r),i.deckReviewMode=!1,i.deckSpecsCollapsed=!0,se(r.id),F(),I();return}if(e.closest('[data-action="apply-common-profile"]')){const r=e.closest("[data-row-id]");if(!r)return;const c=gt(Number(r.getAttribute("data-row-id")));if(!c)return;Bo(c),F(),I();return}if(e.closest(".btn-add-accessory")){const r=is();i.accessories.push(r),i.deckReviewMode=!1,i.deckSpecsCollapsed=!0,se(-1),Si(r.id),F(),z();return}if(e.closest(".btn-done-accordions")){if(i.deckReviewMode){i.deckReviewMode=!1,F(),z();return}I(),i.deckReviewMode=!0,i.deckSpecsCollapsed=!0,se(-1),Si(-1),F(),z();return}if(e.closest(".btn-duplicate-profile")){if(i.deckProfiles.length===1){const r=ls(i.deckProfiles[0]);i.deckProfiles.push(r),i.deckReviewMode=!1,i.deckSpecsCollapsed=!0,se(r.id),F(),I();return}i.deckProfiles.length>1&&(xi.innerHTML=i.deckProfiles.map((r,c)=>`<option value="${r.id}">${c+1}. ${xe(r)}</option>`).join(""),fn.showModal());return}if(e.closest(".btn-remove-row")){const r=e.closest("[data-accessory-id]");if(r){const l=Fe(Number(r.getAttribute("data-accessory-id")));if(!l)return;i.accessories=i.accessories.filter(u=>u.id!==l.id),i.deckProfiles.length===0&&(i.deckReviewMode=!1),F(),z();return}const c=e.closest("[data-row-id]");if(!c)return;const d=gt(Number(c.getAttribute("data-row-id")));if(!d)return;i.deckProfiles=i.deckProfiles.filter(l=>l.id!==d.id),i.deckProfiles.length===0&&(i.deckReviewMode=!1),F(),I(),z();return}if(e.closest(".deck-row-content")){t.stopPropagation();return}if(e.closest('[data-action="toggle-specs"]')){const r=!i.deckSpecsCollapsed;i.deckProfiles.forEach(c=>{c.isCollapsed=!0}),i.deckSpecsCollapsed=r,F();return}const s=e.closest(".deck-summary-row");if(!s)return;const o=s.getAttribute("data-id")||"";if(o.startsWith("a_")){i.deckSpecsCollapsed=!0,ps(Number(o.slice(2))),F();return}const a=Os(s.getAttribute("data-id"));a&&(i.deckSpecsCollapsed=!0,us(a.id),F())}function Ra(t){const e=t.target;if(!(e instanceof HTMLInputElement||e instanceof HTMLSelectElement))return;const n=e.getAttribute("data-group"),s=e.getAttribute("data-field");if(n==="accessory"&&s==="type"){const r=e.closest("[data-accessory-id]");if(!r)return;const c=Fe(Number(r.getAttribute("data-accessory-id")));if(!c)return;c.type=e.value||"",Le(c.type)?c.tons=null:je(c.type)?c.screwCount=null:(c.screwCount=null,c.tons=null),F(),I();return}if(n==="deck-flags"&&s){e instanceof HTMLInputElement&&e.type==="checkbox"?(i.deckFlags[s]=!!e.checked,e.checked?(i.deckFlagSelectionOrder=i.deckFlagSelectionOrder.filter(r=>r!==s),i.deckFlagSelectionOrder.push(s)):i.deckFlagSelectionOrder=i.deckFlagSelectionOrder.filter(r=>r!==s),s==="specifiedManufacturer"&&!e.checked&&(i.deckFlags.specifiedManufacturerName="")):i.deckFlags[s]=String(e.value||"").trim().toUpperCase(),I(),F();return}const o=e.closest("[data-row-id]");if(!o)return;const a=gt(Number(o.getAttribute("data-row-id")));if(a&&!(!n||!s)){if(n==="specs"){a.specs[s]=e.value||"",s==="manufacturer"&&(a.manufacturerExplicit=a.specs.manufacturer!==""),(s==="depth"||s==="manufacturer")&&ds(a),s==="profile"&&ln(a),F(),I();return}if(n==="row"&&s==="method"){a.method=e.value,a.inputs=ns(),ln(a),F(),I();return}if(n==="row"&&s==="overrideTons"){a.overrideTons=e.value,I();return}}}function Ua(t){const e=t.target;if(!(e instanceof HTMLInputElement))return;const n=e.getAttribute("data-group"),s=e.getAttribute("data-field");if(n==="accessory"&&(s==="screwCount"||s==="tons")){const r=e.closest("[data-accessory-id]");if(!r)return;const c=Fe(Number(r.getAttribute("data-accessory-id")));if(!c)return;if(s==="screwCount"){const d=Number.parseInt(e.value,10);c.screwCount=Number.isFinite(d)&&d>=0?d:null}else{const d=Number(e.value);c.tons=Number.isFinite(d)&&d>=0?d:null}I();return}const o=e.closest("[data-row-id]");if(!o)return;const a=gt(Number(o.getAttribute("data-row-id")));if(a&&!(!n||!s)){if(n==="inputs"){a.inputs[s]=e.value,I();return}if(n==="row"&&s==="overrideTons"){a.overrideTons=e.value,I();return}}}function wa(t){if(!(t.target instanceof Element))return;if(t.target.closest('[data-action="toggle-specs"]')&&(t.key==="Enter"||t.key===" ")){t.preventDefault();const a=!i.deckSpecsCollapsed;i.deckProfiles.forEach(r=>{r.isCollapsed=!0}),i.deckSpecsCollapsed=a,F();return}const n=t.target.closest(".deck-summary-row");if(!n||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const s=n.getAttribute("data-id")||"";if(s.startsWith("a_")){i.deckSpecsCollapsed=!0,ps(Number(s.slice(2))),F();return}const o=Os(n.getAttribute("data-id"));o&&(i.deckSpecsCollapsed=!0,us(o.id),F())}function Ba(t){const e=t.target;if(!(e instanceof Element))return;if(e.closest(".btn-remove-joist")){const s=e.closest("[data-joist-id]");if(!s)return;const o=we(Number(s.getAttribute("data-joist-id")));if(!o)return;i.joistItems=i.joistItems.filter(a=>a.id!==o.id),i.joistReviewMode=!1,Be(),pt(),St(),z(),I();return}if(e.closest(".deck-row-content")){t.stopPropagation();return}const n=e.closest("[data-joist-summary-id]");n&&(cs(Number(n.getAttribute("data-joist-summary-id"))),pt())}function Fa(t){const e=t.target;if(!(e instanceof HTMLInputElement||e instanceof HTMLSelectElement))return;const n=e.closest("[data-joist-id]");if(!n)return;const s=we(Number(n.getAttribute("data-joist-id")));if(!s)return;const o=e.getAttribute("data-group"),a=e.getAttribute("data-field");o!=="joist"||!a||a==="series"&&(i.joistReviewMode=!1,s.series=e.value||"",dn(s.series)&&(s.units=""),pt(),St(),z(),I())}function xa(t){const e=t.target;if(!(e instanceof HTMLInputElement))return;const n=e.closest("[data-joist-id]");if(!n)return;const s=we(Number(n.getAttribute("data-joist-id")));if(!s)return;const o=e.getAttribute("data-group"),a=e.getAttribute("data-field");if(!(o!=="joist"||!a)){if(a==="units"){i.joistReviewMode=!1;const r=Number.parseInt(e.value,10);s.units=Number.isFinite(r)&&r>=0?String(r):""}else a==="tons"&&(i.joistReviewMode=!1,s.tons=e.value);Be(),St(),z(),I()}}function Ja(t){if(!(t.target instanceof Element))return;const e=t.target.closest("[data-joist-summary-id]");!e||t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),cs(Number(e.getAttribute("data-joist-summary-id"))),pt())}Ne.addEventListener("input",t=>{i.projectName=t.target.value,Tn(),Wt()});re.addEventListener("input",t=>{i.projectLocation=t.target.value,pe(),I(),Wt()});yt==null||yt.addEventListener("change",t=>{const e=String(t.target.value||"2");i.projectComplexityTier=["1","2","3"].includes(e)?e:"2",I()});tt==null||tt.addEventListener("input",t=>{i.submittalsLeadTime=String(t.target.value||"")});et==null||et.addEventListener("input",t=>{i.fabricationLeadTime=String(t.target.value||"")});ht==null||ht.addEventListener("change",t=>{i.takeoffByTrojan=String(t.target.value||"").toUpperCase()==="NO"?"NO":"YES"});Gt==null||Gt.addEventListener("change",t=>{i.cutListProvided=String(t.target.value||"").toUpperCase()==="YES"?"YES":"NO"});Lt==null||Lt.addEventListener("change",t=>{i.specsReviewed=String(t.target.value||"").toUpperCase()==="YES"?"YES":"NO"});Et==null||Et.addEventListener("input",t=>{i.takeoff.bidNo=String(t.target.value||""),$()});Nt==null||Nt.addEventListener("input",t=>{i.takeoff.jobNumber=String(t.target.value||""),$()});At==null||At.addEventListener("input",t=>{i.takeoff.jobName=String(t.target.value||""),$()});bt==null||bt.addEventListener("input",t=>{i.takeoff.projectLocation=String(t.target.value||""),$()});ze==null||ze.addEventListener("click",()=>{i.takeoff.areas.forEach(e=>{e.isCollapsed=!0});const t=as();i.takeoff.areas.push(t),yn(),R(),$()});Tt==null||Tt.addEventListener("click",()=>{i.takeoff.areas.forEach(t=>{t.isCollapsed=!0,t.deckSectionCollapsed=!0,t.joistSectionCollapsed=!0,t.deckLines.forEach(e=>{e.isCollapsed=!0}),(t.joistGroups||[]).forEach(e=>{e.isCollapsed=!0})}),R(),$()});P==null||P.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const n=e.closest('[data-action="takeoff-remove-area"]');if(n){const C=n.closest("[data-takeoff-area-id]");if(!C)return;const b=Number(C.getAttribute("data-takeoff-area-id"));i.takeoff.areas=i.takeoff.areas.filter(y=>Number(y.id)!==b),yn(),R(),$();return}const s=e.closest('[data-action="takeoff-remove-mark"]');if(s){const C=s.closest("[data-takeoff-group-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const y=Number(C.getAttribute("data-takeoff-group-id"));b.joistGroups=(b.joistGroups||[]).filter(L=>Number(L.id)!==y),R(),$();return}const o=e.closest('[data-action="toggle-takeoff-area"]');if(o){const C=o.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;!!b.isCollapsed?(i.takeoff.areas.forEach(L=>{L.isCollapsed=!0}),b.isCollapsed=!1):b.isCollapsed=!0,R(),$();return}const a=e.closest('[data-action="toggle-takeoff-deck-line"]');if(a){const C=a.closest("[data-takeoff-line-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const y=Number(C.getAttribute("data-takeoff-line-id")),L=b.deckLines.find(w=>Number(w.id)===y);if(!L)return;!!L.isCollapsed?(b.deckLines.forEach(w=>{w.isCollapsed=!0}),L.isCollapsed=!1):L.isCollapsed=!0,R(),$();return}const r=e.closest('[data-action="toggle-takeoff-deck-section"]');if(r){const C=r.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;b.deckSectionCollapsed=!b.deckSectionCollapsed,R(),$();return}const c=e.closest('[data-action="toggle-takeoff-joist-section"]');if(c){const C=c.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;b.joistSectionCollapsed=!b.joistSectionCollapsed,R(),$();return}const d=e.closest('[data-action="toggle-takeoff-joist-group"]');if(d){const C=d.closest("[data-takeoff-group-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const y=Number(C.getAttribute("data-takeoff-group-id")),L=(b.joistGroups||[]).find(w=>Number(w.id)===y);if(!L)return;!!L.isCollapsed?((b.joistGroups||[]).forEach(w=>{w.isCollapsed=!0}),L.isCollapsed=!1):L.isCollapsed=!0,R(),$();return}const l=e.closest('[data-action="takeoff-add-deck"]');if(l){const C=l.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const y=os();b.deckLines.forEach(L=>{L.isCollapsed=!0}),b.deckLines.push(y),b.quickLineId=y.id,b.isCollapsed=!1,Ci(b.id),b.isCollapsed=!1,R(),$();return}const u=e.closest('[data-action="takeoff-add-mark"]');if(u){const C=u.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const y=cn();y.marks.push(rn()),b.joistGroups=Array.isArray(b.joistGroups)?b.joistGroups:[],b.joistGroups.forEach(L=>{L.isCollapsed=!0}),b.joistGroups.push(y),b.isCollapsed=!1,Ci(b.id),b.isCollapsed=!1,R(),$();return}const p=e.closest('[data-action="takeoff-quick-profile"]');if(p){const C=p.closest("[data-takeoff-line-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const y=b.deckLines.find(L=>Number(L.id)===Number(C.getAttribute("data-takeoff-line-id")));if(!y)return;b.quickLineId=y.id,Fo(y,p.getAttribute("data-preset")),R(),$();return}const g=e.closest('[data-action="takeoff-remove-deck-line"]'),f=e.closest('[data-action="takeoff-remove-joist-line"]');if(!g&&!f)return;const k=(g||f).closest("[data-takeoff-line-id]");if(!k)return;const T=V(Number(k.getAttribute("data-takeoff-area-id")));if(!T)return;const E=Number(k.getAttribute("data-takeoff-line-id"));if(String(k.getAttribute("data-takeoff-kind")||"deck").toLowerCase()==="joist"||f){const C=Number(k.getAttribute("data-takeoff-group-id")),b=(T.joistGroups||[]).find(y=>Number(y.id)===C);if(!b)return;b.marks=(b.marks||[]).filter(y=>Number(y.id)!==E)}else T.deckLines=T.deckLines.filter(C=>Number(C.id)!==E),Number(T.quickLineId)===E&&(T.quickLineId=T.deckLines.length>0?T.deckLines[T.deckLines.length-1].id:null);R(),$()});P==null||P.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-area"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-area-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));if(!s)return;!!s.isCollapsed?(i.takeoff.areas.forEach(a=>{a.isCollapsed=!0}),s.isCollapsed=!1):s.isCollapsed=!0,R(),$()});P==null||P.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-deck-section"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-area-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));s&&(s.deckSectionCollapsed=!s.deckSectionCollapsed,R(),$())});P==null||P.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-joist-section"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-area-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));s&&(s.joistSectionCollapsed=!s.joistSectionCollapsed,R(),$())});P==null||P.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-deck-line"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-line-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));if(!s)return;const o=Number(n.getAttribute("data-takeoff-line-id")),a=s.deckLines.find(c=>Number(c.id)===o);if(!a)return;!!a.isCollapsed?(s.deckLines.forEach(c=>{c.isCollapsed=!0}),a.isCollapsed=!1):a.isCollapsed=!0,R(),$()});P==null||P.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-joist-group"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-group-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));if(!s)return;const o=Number(n.getAttribute("data-takeoff-group-id")),a=(s.joistGroups||[]).find(c=>Number(c.id)===o);if(!a)return;!!a.isCollapsed?((s.joistGroups||[]).forEach(c=>{c.isCollapsed=!0}),a.isCollapsed=!1):a.isCollapsed=!0,R(),$()});P==null||P.addEventListener("input",t=>{const e=t.target;if(!(e instanceof HTMLInputElement)&&!(e instanceof HTMLSelectElement))return;const n=e.getAttribute("data-takeoff-field");if(!n)return;const s=e.closest("[data-takeoff-line-id]");if(!s)return;const o=V(Number(s.getAttribute("data-takeoff-area-id")));if(!o)return;const a=Number(s.getAttribute("data-takeoff-line-id"));if(String(s.getAttribute("data-takeoff-kind")||"deck").toLowerCase()==="joist"){const d=Number(s.getAttribute("data-takeoff-group-id")),l=(o.joistGroups||[]).find(p=>Number(p.id)===d);if(!l)return;const u=(l.marks||[]).find(p=>Number(p.id)===a);if(!u)return;Object.prototype.hasOwnProperty.call(u,n)&&(u[n]=e.value),$();return}const c=o.deckLines.find(d=>Number(d.id)===a);c&&(n==="squares"?c.squares=e.value:Object.prototype.hasOwnProperty.call(c.specs,n)&&(c.specs[n]=e.value),$())});P==null||P.addEventListener("change",t=>{const e=t.target;if(!(e instanceof HTMLInputElement)&&!(e instanceof HTMLSelectElement))return;const n=e.getAttribute("data-takeoff-field");if(!n)return;const s=e.closest("[data-takeoff-line-id]");if(!s)return;const o=V(Number(s.getAttribute("data-takeoff-area-id")));if(!o)return;const a=Number(s.getAttribute("data-takeoff-line-id"));if(String(s.getAttribute("data-takeoff-kind")||"deck").toLowerCase()==="joist"){const d=Number(s.getAttribute("data-takeoff-group-id")),l=(o.joistGroups||[]).find(p=>Number(p.id)===d);if(!l)return;const u=(l.marks||[]).find(p=>Number(p.id)===a);if(!u)return;Object.prototype.hasOwnProperty.call(u,n)&&(u[n]=e.value),R(),$();return}const c=o.deckLines.find(d=>Number(d.id)===a);c&&(n==="squares"?c.squares=e.value:Object.prototype.hasOwnProperty.call(c.specs,n)&&(c.specs[n]=e.value),R(),$())});kt&&kt.addEventListener("input",t=>{i.milesFromTrojanFacility=t.target.value,I(),Wt()});Bi.forEach(t=>{t.addEventListener("change",e=>{i.scope=e.target.value,z(),Wt(),Ue().includes(i.currentPage)||Z("project")})});Ut==null||Ut.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const n=e.closest("[data-main-tab]");if(!n||!(n instanceof HTMLButtonElement)||n.disabled)return;const s=String(n.getAttribute("data-main-tab")||"").trim();s&&Z(s)});Ui.addEventListener("click",()=>{Wt()&&En()});Hs.addEventListener("click",Nn);Se.addEventListener("click",()=>{I(),En()});Ks.addEventListener("click",Nn);Fi.addEventListener("click",()=>{I(),Yi()&&En()});Ws.addEventListener("click",Nn);We==null||We.addEventListener("click",()=>{qi(),zi()});wt==null||wt.addEventListener("click",()=>{qi(),zi()});Ys.addEventListener("click",()=>Z("project"));Bt==null||Bt.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),i.pricingOptimizationVisible=!i.pricingOptimizationVisible,ae()});Ye==null||Ye.addEventListener("click",()=>{jn()});Js.addEventListener("click",()=>Z("admin"));_s.addEventListener("click",()=>Z(i.adminReturnPage||"project"));Vs.addEventListener("click",()=>Z("project"));Ke==null||Ke.addEventListener("click",Zi);qs.addEventListener("click",()=>{Yo(),wi.showModal()});zs.addEventListener("click",()=>wi.close());en==null||en.addEventListener("click",()=>Z("admin"));xt==null||xt.addEventListener("click",()=>{i.suppliers.isLoaded&&(i.suppliers.draftRows=i.suppliers.rows.map(t=>({...t})),i.suppliers.isEditing=!0,Ct())});_t==null||_t.addEventListener("click",()=>{i.suppliers.draftRows=i.suppliers.rows.map(t=>({...t})),i.suppliers.isEditing=!1,i.suppliers.loadError="",Ct()});Vt==null||Vt.addEventListener("click",()=>{if(!i.suppliers.isEditing)return;const t={};i.suppliers.columns.forEach(e=>{t[e]=""}),i.suppliers.draftRows.push(t),Ct()});Jt==null||Jt.addEventListener("click",()=>{if(!i.suppliers.isEditing)return;const t=So(i.suppliers.draftRows,i.suppliers.columns,i.suppliers.nameColumnKey);if(!t.isValid){Te(t.message);return}i.suppliers.rows=Hi(i.suppliers.draftRows,i.suppliers.columns),localStorage.setItem(hi,JSON.stringify(i.suppliers.rows)),i.suppliers.draftRows=i.suppliers.rows.map(e=>({...e})),i.suppliers.isEditing=!1,i.suppliers.loadError="",Ct()});at==null||at.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element)||!i.suppliers.isEditing)return;const n=e.closest("[data-suppliers-delete-row]");if(!n)return;const s=Number(n.getAttribute("data-suppliers-delete-row"));!Number.isInteger(s)||s<0||(i.suppliers.draftRows.splice(s,1),Ct())});at==null||at.addEventListener("input",t=>{const e=t.target;if(!(e instanceof HTMLInputElement)||!i.suppliers.isEditing)return;const n=Number(e.getAttribute("data-suppliers-row")),s=e.getAttribute("data-suppliers-column");if(!Number.isInteger(n)||n<0||!s)return;const o=i.suppliers.draftRows[n];!o||!Object.prototype.hasOwnProperty.call(o,s)||(o[s]=e.value)});Rt==null||Rt.addEventListener("click",t=>{const e=t.target;e instanceof Element&&e.closest("#adminSuppliersButton")&&Zi()});nt.addEventListener("click",t=>{var E;const e=t.target;if(!(e instanceof Element))return;const n=e.closest('[data-action="trojan-toggle-edit"]');if(n){const S=n.getAttribute("data-trojan-subsection"),C=S?i.admin.sections.trojan.subsections[S]:null;if(!S||!C)return;if(C.isEditing){ia(S);return}C.isEditing=!0,D();return}const s=e.closest('[data-action="leadtime-toggle-edit"]');if(s){const S=String(s.getAttribute("data-leadtime-supplier")||"").toLowerCase(),C=Pe(S);if(!C)return;if(C.subsection.isEditing){sa(S);return}C.subsection.error="",C.subsection.isEditing=!0,D();return}const o=e.closest('[data-action="leadtime-toggle-sub"]');if(o){const S=String(o.getAttribute("data-leadtime-supplier")||"").toLowerCase();if(!Pe(S))return;S==="trojan"?Oe("leadTimes"):S==="csc"?Ie("leadTimes"):S==="cano"&&gs("leadTimes"),D();return}if(e.closest('[data-action="trojan-add-condition-row"]')){na();return}const r=e.closest('[data-action="trojan-remove-condition-row"]');if(r){const S=(E=i.admin.sections.trojan.subsections)==null?void 0:E.conditions;if(!S||!S.isEditing)return;const C=Number.parseInt(String(r.getAttribute("data-trojan-condition-id")||""),10);if(!Number.isFinite(C)||C<=0)return;i.admin.sections.trojan.values.documentConditions=(i.admin.sections.trojan.values.documentConditions||[]).filter(b=>Number.parseInt(String((b==null?void 0:b.id)??""),10)!==C),D();return}const c=e.closest('[data-action="trojan-toggle-sub"]');if(c){const S=c.getAttribute("data-trojan-subsection"),C=S?i.admin.sections.trojan.subsections[S]:null;if(!S||!C)return;Oe(S),D();return}const d=e.closest('[data-action="csc-toggle-edit"]');if(d){const S=d.getAttribute("data-csc-subsection"),C=S?i.admin.sections.csc.subsections[S]:null;if(!S||!C)return;if(C.isEditing){Xo(S);return}C.isEditing=!0,D();return}const l=e.closest('[data-action="csc-add-row"]');if(l){const S=l.getAttribute("data-csc-subsection"),C=S?i.admin.sections.csc.subsections[S]:null;if(!S||!C||!C.isEditing)return;Zo(S);return}const u=e.closest('[data-action="csc-toggle-sub"]');if(u){const S=u.getAttribute("data-csc-subsection"),C=S?i.admin.sections.csc.subsections[S]:null;if(!S||!C)return;Ie(S),D();return}if(e.closest('[data-action="detailing-toggle-edit"]')){const S=i.admin.sections.detailing;if(!S)return;if(S.isEditing){ta();return}S.isEditing=!0,D();return}if(e.closest('[data-action="detailing-add-row"]')){ea();return}const f=e.closest('[data-action="admin-toggle-edit"]');if(f){const S=f.getAttribute("data-section");if(!S||!i.admin.sections[S])return;const C=i.admin.sections[S];if(C.isEditing){Qo(S);return}C.isEditing=!0,D();return}const k=e.closest(".admin-summary-row");if(!k)return;const T=k.getAttribute("data-admin-id");!T||!i.admin.sections[T]||i.admin.sections[T].isEditing||T==="trojan"&&fs()||T==="csc"&&bs()||T==="cano"&&ks()||(ms(T),D())});nt.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="trojan-toggle-sub"]');if(e&&(t.key==="Enter"||t.key===" ")){t.preventDefault();const r=e.getAttribute("data-trojan-subsection"),c=r?i.admin.sections.trojan.subsections[r]:null;if(!r||!c)return;Oe(r),D();return}const n=t.target.closest('[data-action="csc-toggle-sub"]');if(n&&(t.key==="Enter"||t.key===" ")){t.preventDefault();const r=n.getAttribute("data-csc-subsection"),c=r?i.admin.sections.csc.subsections[r]:null;if(!r||!c)return;Ie(r),D();return}const s=t.target.closest('[data-action="leadtime-toggle-sub"]');if(s&&(t.key==="Enter"||t.key===" ")){t.preventDefault();const r=String(s.getAttribute("data-leadtime-supplier")||"").toLowerCase();if(!Pe(r))return;r==="trojan"?Oe("leadTimes"):r==="csc"?Ie("leadTimes"):r==="cano"&&gs("leadTimes"),D();return}const o=t.target.closest(".admin-summary-row");if(!o||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const a=o.getAttribute("data-admin-id");!a||!i.admin.sections[a]||i.admin.sections[a].isEditing||a==="trojan"&&fs()||a==="csc"&&bs()||a==="cano"&&ks()||(ms(a),D())});nt.addEventListener("focusin",t=>{var o;const e=t.target;if(!(e instanceof HTMLInputElement)||!e.hasAttribute("data-admin-field"))return;const n=e.closest("[data-admin-section]");if(!n)return;const s=n.getAttribute("data-admin-section");!s||!((o=i.admin.sections[s])!=null&&o.isEditing)||e.getAttribute("data-admin-type")!=="text"&&e.value.trim()!==""&&(e.value=String(v(e.value)))});nt.addEventListener("focusout",t=>{var o;const e=t.target;if(!(e instanceof HTMLInputElement)||!e.hasAttribute("data-admin-field"))return;const n=e.closest("[data-admin-section]");if(!n)return;const s=n.getAttribute("data-admin-section");!s||!((o=i.admin.sections[s])!=null&&o.isEditing)||e.getAttribute("data-admin-type")!=="text"&&e.value.trim()!==""&&(e.value=M(v(e.value)))});jt.addEventListener("click",Ma);jt.addEventListener("change",Ra);jt.addEventListener("input",Ua);jt.addEventListener("keydown",wa);W==null||W.addEventListener("click",Ba);W==null||W.addEventListener("change",Fa);W==null||W.addEventListener("input",xa);W==null||W.addEventListener("keydown",Ja);oe==null||oe.addEventListener("click",()=>{const t=ss();i.joistItems.push(t),i.joistReviewMode=!1,_o(t.id),pt(),Be(),St(),z(),I()});Ft==null||Ft.addEventListener("click",()=>{if(i.joistItems.length!==0){if(i.joistReviewMode){i.joistReviewMode=!1,pt(),St(),z();return}Be(),i.joistReviewMode=!0,i.joistItems.forEach(t=>{t.isCollapsed=!0}),pt(),St(),z(),I()}});Qs.addEventListener("click",()=>{const t=Number(xi.value),e=gt(t);if(e){const n=ls(e);i.deckProfiles.push(n),i.deckReviewMode=!1,i.deckSpecsCollapsed=!0,se(n.id),F(),I(),z()}fn.close()});Xs.addEventListener("click",()=>{fn.close()});ce.addEventListener("change",t=>{i.joists.supplier=t.target.value,I()});le.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;if(e.closest("#pricingProposalButton")){jn();return}if(e.closest("#pricingOptimizeButton")){if(i.pricingOptimizationLoading)return;if(i.pricingOptimizationVisible){i.pricingOptimizationVisible=!1,i.pricingOptimizationLoading=!1,ot&&(window.clearTimeout(ot),ot=null),ae();return}i.pricingOptimizationVisible=!0,i.pricingOptimizationLoading=!0,ae(),ot&&window.clearTimeout(ot),ot=window.setTimeout(()=>{i.pricingOptimizationLoading=!1,ot=null,i.pricingOptimizationVisible&&ae()},650);return}const o=e.closest('[data-action="apply-optimized-option"]');if(o){const l=Number(o.getAttribute("data-optimization-index"));Number.isInteger(l)&&l>=0&&Ia(l);return}if(e.closest('[data-action="pricing-detailing-reset-auto"]')){i.pricingDetailing.detailingPercentOverride=null,Pt();return}const r=e.closest('[data-action="toggle-pricing-section"]');if(!r)return;const c=r.getAttribute("data-pricing-section");if(!c||!Object.prototype.hasOwnProperty.call(i.pricingSections,c))return;!!i.pricingSections[c]?(Object.keys(i.pricingSections).forEach(l=>{i.pricingSections[l]=!0}),i.pricingSections[c]=!1):i.pricingSections[c]=!0,Pt()});le.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-pricing-section"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.getAttribute("data-pricing-section");if(!n||!Object.prototype.hasOwnProperty.call(i.pricingSections,n))return;!!i.pricingSections[n]?(Object.keys(i.pricingSections).forEach(o=>{i.pricingSections[o]=!0}),i.pricingSections[n]=!1):i.pricingSections[n]=!0,Pt()});le.addEventListener("input",t=>{const e=t.target;if(!(e instanceof HTMLInputElement))return;if(e.getAttribute("data-action")==="pricing-detailing-percent-input"){const s=m(e.value);i.pricingDetailing.detailingPercentOverride=s>0?s:0;return}if(e.getAttribute("data-action")!=="pricing-margin-input")return;const n=e.getAttribute("data-pricing-margin-section");!n||!Object.prototype.hasOwnProperty.call(i.pricingMargins,n)||(i.pricingMargins[n]=m(e.value),Object.prototype.hasOwnProperty.call(i.pricingMarginOverrides,n)&&(i.pricingMarginOverrides[n]=!0))});le.addEventListener("change",t=>{const e=t.target;if(!(e instanceof HTMLInputElement))return;if(e.getAttribute("data-action")==="pricing-detailing-percent-input"){const s=m(e.value);i.pricingDetailing.detailingPercentOverride=s>0?s:0,Pt();return}if(e.getAttribute("data-action")!=="pricing-margin-input")return;const n=e.getAttribute("data-pricing-margin-section");!n||!Object.prototype.hasOwnProperty.call(i.pricingMargins,n)||(i.pricingMargins[n]=m(e.value),Object.prototype.hasOwnProperty.call(i.pricingMarginOverrides,n)&&(i.pricingMarginOverrides[n]=!0),Pt())});function _a(){fo(),tt&&(tt.readOnly=!0),et&&(et.readOnly=!0),ce.value=i.joists.supplier,Ne.value=i.projectName,re.value=i.projectLocation,yt&&(yt.value=["1","2","3"].includes(i.projectComplexityTier)?i.projectComplexityTier:"2"),tt&&(tt.value=i.submittalsLeadTime||""),et&&(et.value=i.fabricationLeadTime||""),ht&&(ht.value=i.takeoffByTrojan==="NO"?"NO":"YES"),Gt&&(Gt.value=i.cutListProvided==="YES"?"YES":"NO"),Lt&&(Lt.value=i.specsReviewed==="YES"?"YES":"NO"),kt&&(kt.value=i.milesFromTrojanFacility),Et&&(Et.value=i.takeoff.bidNo||""),Nt&&(Nt.value=i.takeoff.jobNumber||""),At&&(At.value=i.takeoff.jobName||""),bt&&(bt.value=i.takeoff.projectLocation||""),go(),Tn(),z(),F(),pt(),R(),St(),D(),Ct(),I(),pe(),Z("project")}typeof window<"u"&&(window.openProposalGenerator=jn,window.runVendorStrategyHarness=wo);_a();Ki().then(()=>{I()});
