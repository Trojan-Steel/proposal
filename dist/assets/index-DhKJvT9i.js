(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const Ps={"0.6C20":{UNC:189,G30:189,G60:189,G90:192},"0.6C22":{UNC:156,G30:156,G60:156,G90:159},"0.6C24":{UNC:124,G30:124,G60:124,G90:127},"0.6C26":{UNC:92,G30:92,G60:92,G90:95},"0.6C28":{UNC:81,G30:81,G60:81,G90:84},"0.6CSV20":{UNC:191,G30:191,G60:191,G90:194},"0.6CSV22":{UNC:158,G30:158,G60:158,G90:161},"0.6CSV24":{UNC:126,G30:126,G60:126,G90:129},"0.6CSV26":{UNC:94,G30:94,G60:94,G90:97},"0.6CSV28":{UNC:83,G30:83,G60:83,G90:86},"1.3C20":{UNC:208,G30:208,G60:208,G90:211},"1.3C22":{UNC:166,G30:166,G60:166,G90:169},"1.3C24":{UNC:134,G30:134,G60:134,G90:137},"1.3C26":{UNC:102,G30:102,G60:102,G90:105},"1.3CSV20":{UNC:210,G30:210,G60:210,G90:213},"1.3CSV22":{UNC:168,G30:168,G60:168,G90:171},"1.3CSV24":{UNC:136,G30:136,G60:136,G90:139},"1.3CSV26":{UNC:104,G30:104,G60:104,G90:107},"1.5B16":{UNC:334,G30:334,G60:334,G90:337},"1.5B18":{UNC:265,G30:265,G60:265,G90:268},"1.5B20":{UNC:202,G30:202,G60:202,G90:205},"1.5B22":{UNC:167,G30:167,G60:167,G90:170},"1.5BA16":{UNC:336,G30:336,G60:336,G90:339},"1.5BA18":{UNC:267,G30:267,G60:267,G90:270},"1.5BA20":{UNC:204,G30:204,G60:204,G90:207},"1.5BA22":{UNC:169,G30:169,G60:169,G90:172},"1.5BI16":{UNC:334,G30:334,G60:334,G90:337},"1.5BI18":{UNC:265,G30:265,G60:265,G90:268},"1.5BI20":{UNC:202,G30:202,G60:202,G90:205},"1.5BI22":{UNC:167,G30:167,G60:167,G90:170},"1.5BIA16":{UNC:336,G30:336,G60:336,G90:339},"1.5BIA18":{UNC:267,G30:267,G60:267,G90:270},"1.5BIA20":{UNC:204,G30:204,G60:204,G90:207},"1.5BIA22":{UNC:169,G30:169,G60:169,G90:172},"1.5BP16":{UNC:0,G30:0,G60:0,G90:0},"1.5BP16/18":{UNC:0,G30:0,G60:0,G90:0},"1.5BP18":{UNC:0,G30:0,G60:0,G90:0},"1.5BP18/16":{UNC:0,G30:0,G60:0,G90:0},"1.5BP18/20":{UNC:0,G30:0,G60:0,G90:0},"1.5BP20":{UNC:0,G30:0,G60:0,G90:0},"1.5BP20/18":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA16":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA16/18":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA18":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA18/16":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA18/20":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA20":{UNC:0,G30:0,G60:0,G90:0},"1.5BPA20/18":{UNC:0,G30:0,G60:0,G90:0},"1.5C16":{UNC:334,G30:334,G60:334,G90:337},"1.5C18":{UNC:265,G30:265,G60:265,G90:268},"1.5C20":{UNC:202,G30:202,G60:202,G90:205},"1.5C22":{UNC:167,G30:167,G60:167,G90:170},"1.5VL16":{UNC:334,G30:334,G60:334,G90:337},"1.5VL18":{UNC:265,G30:265,G60:265,G90:268},"1.5VL19":{UNC:238,G30:238,G60:238,G90:241},"1.5VL20":{UNC:202,G30:202,G60:202,G90:205},"1.5VL22":{UNC:167,G30:167,G60:167,G90:170},"1.5VLI16":{UNC:334,G30:334,G60:334,G90:337},"1.5VLI18":{UNC:265,G30:265,G60:265,G90:268},"1.5VLI19":{UNC:238,G30:238,G60:238,G90:241},"1.5VLI20":{UNC:202,G30:202,G60:202,G90:205},"1.5VLI22":{UNC:167,G30:167,G60:167,G90:170},"1.5VLP16":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP16/18":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP18":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP18/16":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP18/20":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP20":{UNC:0,G30:0,G60:0,G90:0},"1.5VLP20/18":{UNC:0,G30:0,G60:0,G90:0},"1.5VLR16":{UNC:334,G30:334,G60:334,G90:337},"1.5VLR18":{UNC:265,G30:265,G60:265,G90:268},"1.5VLR19":{UNC:238,G30:238,G60:238,G90:241},"1.5VLR20":{UNC:202,G30:202,G60:202,G90:205},"1.5VLR22":{UNC:167,G30:167,G60:167,G90:170},"1C20":{UNC:199,G30:199,G60:199,G90:202},"1C22":{UNC:159,G30:159,G60:159,G90:162},"1C24":{UNC:134,G30:134,G60:134,G90:137},"1C26":{UNC:102,G30:102,G60:102,G90:105},"1CSV20":{UNC:201,G30:201,G60:201,G90:204},"1CSV22":{UNC:161,G30:161,G60:161,G90:164},"1CSV24":{UNC:136,G30:136,G60:136,G90:139},"1CSV26":{UNC:104,G30:104,G60:104,G90:107},"1E20":{UNC:199,G30:199,G60:199,G90:202},"1E22":{UNC:159,G30:159,G60:159,G90:162},"1E24":{UNC:134,G30:134,G60:134,G90:137},"1E26":{UNC:102,G30:102,G60:102,G90:105},"2C18":{UNC:185,G30:185,G60:185,G90:188},"2C20":{UNC:218,G30:218,G60:218,G90:221},"2C22":{UNC:187,G30:187,G60:187,G90:190},"2C24":{UNC:145,G30:145,G60:145,G90:148},"2CSV18":{UNC:289,G30:289,G60:289,G90:292},"2CSV20":{UNC:220,G30:220,G60:220,G90:223},"2CSV22":{UNC:189,G30:189,G60:189,G90:192},"2CSV24":{UNC:147,G30:147,G60:147,G90:150},"2D16":{UNC:0,G30:0,G60:0,G90:0},"2D18":{UNC:0,G30:0,G60:0,G90:0},"2D20":{UNC:0,G30:0,G60:0,G90:0},"2D22":{UNC:0,G30:0,G60:0,G90:0},"2DA16":{UNC:0,G30:0,G60:0,G90:0},"2DA18":{UNC:0,G30:0,G60:0,G90:0},"2DA20":{UNC:0,G30:0,G60:0,G90:0},"2DA22":{UNC:0,G30:0,G60:0,G90:0},"2DAFORMLOK16":{UNC:0,G30:0,G60:0,G90:0},"2DAFORMLOK18":{UNC:0,G30:0,G60:0,G90:0},"2DAFORMLOK20":{UNC:0,G30:0,G60:0,G90:0},"2DAFORMLOK22":{UNC:0,G30:0,G60:0,G90:0},"2DFORMLOK16":{UNC:0,G30:0,G60:0,G90:0},"2DFORMLOK18":{UNC:0,G30:0,G60:0,G90:0},"2DFORMLOK20":{UNC:0,G30:0,G60:0,G90:0},"2DFORMLOK22":{UNC:0,G30:0,G60:0,G90:0},"2VLI16":{UNC:317,G30:317,G60:317,G90:320},"2VLI18":{UNC:251,G30:251,G60:251,G90:254},"2VLI19":{UNC:217,G30:217,G60:217,G90:220},"2VLI20":{UNC:191,G30:191,G60:191,G90:194},"2VLI22":{UNC:158,G30:158,G60:158,G90:161},"2VLP16":{UNC:0,G30:0,G60:0,G90:0},"2VLP16/18":{UNC:0,G30:0,G60:0,G90:0},"2VLP18":{UNC:0,G30:0,G60:0,G90:0},"2VLP18/16":{UNC:0,G30:0,G60:0,G90:0},"2VLP18/20":{UNC:0,G30:0,G60:0,G90:0},"2VLP20":{UNC:0,G30:0,G60:0,G90:0},"2VLP20/18":{UNC:0,G30:0,G60:0,G90:0},"2VLPA16":{UNC:0,G30:0,G60:0,G90:0},"2VLPA16/18":{UNC:0,G30:0,G60:0,G90:0},"2VLPA18":{UNC:0,G30:0,G60:0,G90:0},"2VLPA18/16":{UNC:0,G30:0,G60:0,G90:0},"2VLPA18/20":{UNC:0,G30:0,G60:0,G90:0},"2VLPA20":{UNC:0,G30:0,G60:0,G90:0},"2VLPA20/18":{UNC:0,G30:0,G60:0,G90:0},"3.5D16":{UNC:0,G30:0,G60:0,G90:0},"3.5D18":{UNC:0,G30:0,G60:0,G90:0},"3.5D20":{UNC:0,G30:0,G60:0,G90:0},"3.5DA16":{UNC:0,G30:0,G60:0,G90:0},"3.5DA18":{UNC:0,G30:0,G60:0,G90:0},"3.5DA20":{UNC:0,G30:0,G60:0,G90:0},"3.5DAFORMLOK16":{UNC:0,G30:0,G60:0,G90:0},"3.5DAFORMLOK18":{UNC:0,G30:0,G60:0,G90:0},"3.5DAFORMLOK20":{UNC:0,G30:0,G60:0,G90:0},"3.5DFORMLOK16":{UNC:0,G30:0,G60:0,G90:0},"3.5DFORMLOK18":{UNC:0,G30:0,G60:0,G90:0},"3.5DFORMLOK20":{UNC:0,G30:0,G60:0,G90:0},"3N-2416":{UNC:411,G30:411,G60:411,G90:414},"3N-2418":{UNC:325,G30:325,G60:325,G90:328},"3N-2420":{UNC:248,G30:248,G60:248,G90:251},"3N-2422":{UNC:205,G30:205,G60:205,G90:208},"3NA-2416":{UNC:413,G30:413,G60:413,G90:416},"3NA-2418":{UNC:327,G30:327,G60:327,G90:330},"3NA-2420":{UNC:250,G30:250,G60:250,G90:253},"3NA-2422":{UNC:207,G30:207,G60:207,G90:210},"3NI-2416":{UNC:411,G30:411,G60:411,G90:414},"3NI-2418":{UNC:325,G30:325,G60:325,G90:328},"3NI-2420":{UNC:248,G30:248,G60:248,G90:251},"3NI-2422":{UNC:205,G30:205,G60:205,G90:208},"3NI-3216":{UNC:390,G30:390,G60:390,G90:393},"3NI-3218":{UNC:309,G30:309,G60:309,G90:312},"3NI-3220":{UNC:235,G30:235,G60:235,G90:238},"3NI-3222":{UNC:195,G30:195,G60:195,G90:198},"3NIA-2416":{UNC:413,G30:413,G60:413,G90:416},"3NIA-2418":{UNC:327,G30:327,G60:327,G90:330},"3NIA-2420":{UNC:250,G30:250,G60:250,G90:253},"3NIA-2422":{UNC:207,G30:207,G60:207,G90:210},"3NIA-3216":{UNC:392,G30:392,G60:392,G90:395},"3NIA-3218":{UNC:311,G30:311,G60:311,G90:314},"3NIA-3220":{UNC:237,G30:237,G60:237,G90:240},"3NIA-3222":{UNC:197,G30:197,G60:197,G90:200},"3NL-3216":{UNC:390,G30:390,G60:390,G90:393},"3NL-3218":{UNC:309,G30:309,G60:309,G90:312},"3NL-3220":{UNC:235,G30:235,G60:235,G90:238},"3NL-3222":{UNC:195,G30:195,G60:195,G90:198},"3NLA-3216":{UNC:392,G30:392,G60:392,G90:395},"3NLA-3218":{UNC:311,G30:311,G60:311,G90:314},"3NLA-3220":{UNC:237,G30:237,G60:237,G90:240},"3NLA-3222":{UNC:197,G30:197,G60:197,G90:200},"3NP-2416":{UNC:0,G30:0,G60:0,G90:0},"3NP-2416/18":{UNC:0,G30:0,G60:0,G90:0},"3NP-2418":{UNC:0,G30:0,G60:0,G90:0},"3NP-2418/16":{UNC:0,G30:0,G60:0,G90:0},"3NP-2418/20":{UNC:0,G30:0,G60:0,G90:0},"3NP-2420":{UNC:0,G30:0,G60:0,G90:0},"3NP-2420/18":{UNC:0,G30:0,G60:0,G90:0},"3NP-3216":{UNC:0,G30:0,G60:0,G90:0},"3NP-3216/18":{UNC:0,G30:0,G60:0,G90:0},"3NP-3218":{UNC:0,G30:0,G60:0,G90:0},"3NP-3218/16":{UNC:0,G30:0,G60:0,G90:0},"3NP-3218/20":{UNC:0,G30:0,G60:0,G90:0},"3NP-3220":{UNC:0,G30:0,G60:0,G90:0},"3NP-3220/18":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2416":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2416/18":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2418":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2418/16":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2418/20":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2420":{UNC:0,G30:0,G60:0,G90:0},"3NPA-2420/18":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3216":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3216/18":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3218":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3218/16":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3218/20":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3220":{UNC:0,G30:0,G60:0,G90:0},"3NPA-3220/18":{UNC:0,G30:0,G60:0,G90:0},"3VLI16":{UNC:357,G30:357,G60:357,G90:360},"3VLI18":{UNC:283,G30:283,G60:283,G90:286},"3VLI19":{UNC:248,G30:248,G60:248,G90:251},"3VLI20":{UNC:215,G30:215,G60:215,G90:218},"3VLI22":{UNC:178,G30:178,G60:178,G90:181},"3VLP16":{UNC:0,G30:0,G60:0,G90:0},"3VLP16/18":{UNC:0,G30:0,G60:0,G90:0},"3VLP18":{UNC:0,G30:0,G60:0,G90:0},"3VLP18/16":{UNC:0,G30:0,G60:0,G90:0},"3VLP18/20":{UNC:0,G30:0,G60:0,G90:0},"3VLP20":{UNC:0,G30:0,G60:0,G90:0},"3VLP20/18":{UNC:0,G30:0,G60:0,G90:0},"3VLPA16":{UNC:0,G30:0,G60:0,G90:0},"3VLPA16/18":{UNC:0,G30:0,G60:0,G90:0},"3VLPA18":{UNC:0,G30:0,G60:0,G90:0},"3VLPA18/16":{UNC:0,G30:0,G60:0,G90:0},"3VLPA18/20":{UNC:0,G30:0,G60:0,G90:0},"3VLPA20":{UNC:0,G30:0,G60:0,G90:0},"3VLPA20/18":{UNC:0,G30:0,G60:0,G90:0}};window.DECK_LBS_PER_SQ=Ps;const Ds={CANO:{poundsPerTon:2e3}},Ni="trojan_admin_pricing_v1",Ai="trojan_admin_changelog_v1",hi="admin_trojan_min_project_margin_v1",yi="admin_detailing_buckets_v1",Gi="suppliersTable_v1",Li="proposalData_v1",mn="trojan_calculator_draft_v1",Mn="trojan_proposal_quote_counter_v1",Rn="trojan_proposal_quote_log_v1",Ms="TROJ26",on=274,Un="GOOGLE_MAPS_API_KEY",mt={trojan:{label:"TROJAN",fields:[{key:"coilCostPerLb",label:"COIL COST ($/LB)",type:"currency"},{key:"inboundFreightPerLb",label:"INBOUND FREIGHT ($/LB)",type:"currency"},{key:"laborPerLb",label:"LABOR ($/LB)",type:"currency"},{key:"outboundFreightPerMi",label:"OUTBOUND FREIGHT ($/MI)",type:"currency"},{key:"facilityAddress",label:"FACILITY ADDRESS",type:"text"},{key:"accessoriesCostPerScrew",label:"COST PER SCREW ($)",type:"currency"},{key:"accessoriesCostPerTon",label:"ACCESSORIES COST PER TON ($/TON)",type:"currency"},{key:"minimumProjectMargin",label:"Minimum Project Margin",type:"currency"}]},csc:{label:"CSC",fields:[]},cano:{label:"CANO",fields:[{key:"perLb",label:"$/LB",type:"currency"}]},detailing:{label:"DETAILING",fields:[]}},ji={inbound:["coilCostPerLb","inboundFreightPerLb"],mfg:["laborPerLb"],outbound:["outboundFreightPerMi","facilityAddress"],accessories:["accessoriesCostPerScrew","accessoriesCostPerTon"],leadTimes:[],margins:["minimumProjectMargin"],conditions:[]},Oi=[{value:"PAGE_1",label:"PAGE 1"},{value:"STANDARD_EXCLUSIONS",label:"STANDARD EXCLUSIONS"},{value:"STANDARD_QUALIFICATIONS",label:"STANDARD QUALIFICATIONS"},{value:"GENERAL_SALE_TERMS",label:"GENERAL SALE TERMS"},{value:"GENERAL_SALE_TERMS_CONTINUED",label:"GENERAL SALE TERMS (CONTINUED)"},{value:"ACKNOWLEDGMENT",label:"ACKNOWLEDGMENT"}],Ii=Oi.map(t=>t.value),$i=[{start:0,end:9},{start:10,end:24},{start:25,end:49},{start:50,end:99},{start:100,end:1e3}],Rs=$i.map((t,e)=>({...t,cost:[6e3,4500,4e3,3500,3e3][e]})),Us=$i.map((t,e)=>({...t,cost:[6e3,4e3,3500,2500,2100][e]})),ws=[{start:0,end:9},{start:10,end:24},{start:25,end:49},{start:50,end:99},{start:100,end:299},{start:300,end:1e3}],Pe=["DECK+JOISTS","DECK_ONLY","JOIST_ONLY"],De=[1,2,3],zt=["TROJAN","CSC","CANO"];function w(t){if(t==null)return"";const e=String(t).trim();if(e==="")return"";const n=Number.parseInt(e,10);return!Number.isFinite(n)||n<0?"":n}function Me(){return{trojan:{submittalsDeckOnly:{min:"",max:""},submittalsJoistsUnder50:{min:"",max:""},submittalsDeckAndJoistsOver50:{min:"",max:""},fabrication:{min:"",max:""}},csc:{fabrication:{min:"",max:""}},cano:{fabrication:{min:"",max:""}}}}function Dt(t){var s,o,a,r,c,l,d,p,u,m,f,k,S,T,E,C,b,h,L,j,B,Z,Q,ot,at;const e=Me(),n=((s=t==null?void 0:t.trojan)==null?void 0:s.submittals)||{};return{trojan:{submittalsDeckOnly:{min:w(((a=(o=t==null?void 0:t.trojan)==null?void 0:o.submittalsDeckOnly)==null?void 0:a.min)??(n==null?void 0:n.min)??e.trojan.submittalsDeckOnly.min),max:w(((c=(r=t==null?void 0:t.trojan)==null?void 0:r.submittalsDeckOnly)==null?void 0:c.max)??(n==null?void 0:n.max)??e.trojan.submittalsDeckOnly.max)},submittalsJoistsUnder50:{min:w(((d=(l=t==null?void 0:t.trojan)==null?void 0:l.submittalsJoistsUnder50)==null?void 0:d.min)??(n==null?void 0:n.min)??e.trojan.submittalsJoistsUnder50.min),max:w(((u=(p=t==null?void 0:t.trojan)==null?void 0:p.submittalsJoistsUnder50)==null?void 0:u.max)??(n==null?void 0:n.max)??e.trojan.submittalsJoistsUnder50.max)},submittalsDeckAndJoistsOver50:{min:w(((f=(m=t==null?void 0:t.trojan)==null?void 0:m.submittalsDeckAndJoistsOver50)==null?void 0:f.min)??(n==null?void 0:n.min)??e.trojan.submittalsDeckAndJoistsOver50.min),max:w(((S=(k=t==null?void 0:t.trojan)==null?void 0:k.submittalsDeckAndJoistsOver50)==null?void 0:S.max)??(n==null?void 0:n.max)??e.trojan.submittalsDeckAndJoistsOver50.max)},fabrication:{min:w(((E=(T=t==null?void 0:t.trojan)==null?void 0:T.fabrication)==null?void 0:E.min)??e.trojan.fabrication.min),max:w(((b=(C=t==null?void 0:t.trojan)==null?void 0:C.fabrication)==null?void 0:b.max)??e.trojan.fabrication.max)}},csc:{fabrication:{min:w(((L=(h=t==null?void 0:t.csc)==null?void 0:h.fabrication)==null?void 0:L.min)??e.csc.fabrication.min),max:w(((B=(j=t==null?void 0:t.csc)==null?void 0:j.fabrication)==null?void 0:B.max)??e.csc.fabrication.max)}},cano:{fabrication:{min:w(((Q=(Z=t==null?void 0:t.cano)==null?void 0:Z.fabrication)==null?void 0:Q.min)??e.cano.fabrication.min),max:w(((at=(ot=t==null?void 0:t.cano)==null?void 0:ot.fabrication)==null?void 0:at.max)??e.cano.fabrication.max)}}}}const Pi=[{SUPPLIER:"TROJAN",DECK:"TRUE",DEPTH:"1.5, 2.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"FALSE",PRIORITY:"1","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"},{SUPPLIER:"CANO",DECK:"TRUE",DEPTH:"0.6, 1.0, 1.5, 2.0, 3.0",JOISTS:"TRUE","AMERICAN STEEL REQUIRED":"FALSE","AMERICAN MANUFACTURING":"FALSE","SDI MANUFACTURING":"TRUE",PRIORITY:"2","JOIST LOCATION":"MEXICO","DECK LOCATION":"MEXICO"},{SUPPLIER:"CSC",DECK:"TRUE",DEPTH:"0.6, 1.0, 1.3, 1.5, 2.0, 3.0, 3.5, 4.0",JOISTS:"TRUE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"3","JOIST LOCATION":"MO","DECK LOCATION":"FL"},{SUPPLIER:"CUTTING EDGE",DECK:"TRUE",DEPTH:"1.5, 2.0, 3.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"4","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"},{SUPPLIER:"CORDECK",DECK:"TRUE",DEPTH:"0.6, 1.5, 2.0, 3.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"5","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"},{SUPPLIER:"CSM",DECK:"TRUE",DEPTH:"0.6, 1.0, 1.5, 2.0, 3.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"6","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"},{SUPPLIER:"HOUSTONBDECK",DECK:"TRUE",DEPTH:"1.5, 2.0, 3.0",JOISTS:"FALSE","AMERICAN STEEL REQUIRED":"TRUE","AMERICAN MANUFACTURING":"TRUE","SDI MANUFACTURING":"TRUE",PRIORITY:"7","JOIST LOCATION":"FALSE","DECK LOCATION":"TX"}];function an(t){return t.map(e=>({...e}))}function wn(t,e){return Array.isArray(t)?e.map((n,s)=>{const o=t[s]||{};return{start:v(o.start??n.start),end:v(o.end??n.end),cost:v(o.cost??o.rate??n.cost)}}):t&&typeof t=="object"?e.map(n=>{const s=`${n.start}-${n.end}`;return{start:n.start,end:n.end,cost:v(t[s]??n.cost)}}):an(e)}function Ne(){const t=Me();return{joists:{buckets:an(Rs),extraShippingFee_0_9:3500},deck:{buckets:an(Us)},leadTimes:t.csc}}function le(t){const e=Ne(),n=Ne(),s=t==null?void 0:t.joists,o=t==null?void 0:t.deck;return n.joists.buckets=wn((s==null?void 0:s.buckets)??(s==null?void 0:s.bucketPrices),e.joists.buckets),n.deck.buckets=wn((o==null?void 0:o.buckets)??(o==null?void 0:o.bucketPrices),e.deck.buckets),n.joists.extraShippingFee_0_9=v((s==null?void 0:s.extraShippingFee_0_9)??e.joists.extraShippingFee_0_9),n.leadTimes=Dt({csc:t==null?void 0:t.leadTimes}).csc,n}function Di(){return{perLb:"",leadTimes:Me().cano}}function Re(t){const e=Di();return{perLb:v((t==null?void 0:t.perLb)??e.perLb),leadTimes:Dt({cano:t==null?void 0:t.leadTimes}).cano}}function Bs(t,e,n){const s=[3.5,3.75,4,4.25,4.5,4.75],o=t==="DECK_ONLY"?-.5:t==="JOIST_ONLY"?-.25:0,a=e===1?0:e===2?.25:.5,r=s[n]+o+a;return Math.max(3,Math.min(5,Math.round(r*100)/100))}function Mi(){const t=[];return Pe.forEach(e=>{De.forEach(n=>{ws.forEach((s,o)=>{t.push({start:s.start,end:s.end,scopeType:e,tier:n,detailingPercent:Bs(e,n,o)})})})}),{minimumFee:500,buckets:t}}function lt(t){const e=Mi(),s=(Array.isArray(t==null?void 0:t.buckets)?t.buckets:Array.isArray(t)?t:[]).map(o=>({start:v(o==null?void 0:o.start),end:v(o==null?void 0:o.end),scopeType:String((o==null?void 0:o.scopeType)||(o==null?void 0:o.scope)||"").trim().toUpperCase(),tier:Number.parseInt(String((o==null?void 0:o.tier)??""),10),detailingPercent:v((o==null?void 0:o.detailingPercent)??(o==null?void 0:o.percent))})).filter(o=>Number.isFinite(o.start)&&Number.isFinite(o.end)&&Pe.includes(o.scopeType)&&De.includes(o.tier));return{minimumFee:v((t==null?void 0:t.minimumFee)??e.minimumFee),buckets:s.length>0?s:e.buckets}}function gn(t){return Array.isArray(t)?t.map((e,n)=>{const s=Number.parseInt(String((e==null?void 0:e.id)??""),10),o=String((e==null?void 0:e.slot)||"").trim().toUpperCase(),a=Ii.includes(o)?o:"GENERAL_SALE_TERMS_CONTINUED",r=String((e==null?void 0:e.text)||"").trim(),c=Number.parseInt(String((e==null?void 0:e.afterNumber)??""),10);return{id:Number.isFinite(s)&&s>0?s:n+1,slot:a,text:r,afterNumber:Number.isFinite(c)&&c>=0?c:0}}).filter(e=>e.text!==""):[]}function Ri(){const t=Me();return{sections:{trojan:{values:{coilCostPerLb:"",inboundFreightPerLb:"",laborPerLb:"",outboundFreightPerMi:"",facilityAddress:"",accessoriesCostPerScrew:"",accessoriesCostPerTon:"",minimumProjectMargin:4e3,documentConditions:[],leadTimes:t.trojan},isCollapsed:!0,isEditing:!1,subsections:{inbound:{isCollapsed:!0,isEditing:!1},mfg:{isCollapsed:!0,isEditing:!1},outbound:{isCollapsed:!0,isEditing:!1},accessories:{isCollapsed:!0,isEditing:!1},leadTimes:{isCollapsed:!0,isEditing:!1,error:""},margins:{isCollapsed:!0,isEditing:!1},conditions:{isCollapsed:!0,isEditing:!1}}},csc:{values:Ne(),isCollapsed:!0,isEditing:!1,subsections:{joists:{isCollapsed:!0,isEditing:!1},deck:{isCollapsed:!0,isEditing:!1},leadTimes:{isCollapsed:!0,isEditing:!1,error:""}}},cano:{values:Di(),isCollapsed:!0,isEditing:!1,subsections:{leadTimes:{isCollapsed:!0,isEditing:!1,error:""}}},detailing:{values:Mi(),isCollapsed:!0,isEditing:!1}},changelog:[]}}const i={projectName:"",projectLocation:"",projectComplexityTier:"2",submittalsLeadTime:"",fabricationLeadTime:"",takeoffByTrojan:"YES",cutListProvided:"NO",specsReviewed:"NO",milesFromTrojanFacility:"",scope:"joist-deck",currentPage:"project",adminReturnPage:"project",deckSpecsCollapsed:!1,deckReviewMode:!1,joistReviewMode:!1,deckFlags:{americanSteelRequired:!1,americanManufacturing:!1,sdiManufacturer:!1,specifiedManufacturer:!1,specifiedManufacturerName:""},deckFlagSelectionOrder:[],deckProfiles:[],accessories:[],admin:Ri(),joists:{supplier:"CSC",tons:""},joistItems:[],takeoff:{bidNo:"",jobNumber:"",jobName:"",projectLocation:"",areas:[],nextAreaNumber:1},totals:{joistsTotal:0,totalDeckSqs:0,deckTotal:0,totalDeckTons:0,trojanDeckTons:0,brokeredDeckTons:0,trojanShipping:0,trojanShippingTrucks:0,trojanShippingMiles:0,trojanShippingRate:0,grandTotal:0},pricingSections:{trojanDeck:!0,brokeredDeck:!0,accessories:!1,joists:!0,detailing:!0},pricingDetailing:{detailingPercentAuto:0,detailingPercentOverride:null,detailingAmount:0,subtotal:0,finalTotal:0},pricingOptimizationVisible:!1,pricingOptimizationLoading:!1,pricingOptimizationScenarios:[],appliedOptimizationSelection:{deckMode:"auto",deckVendor:"",deckAssignments:[],joistVendor:"",label:""},pricingMargins:{trojanDeck:15,brokeredDeck:5,joists:5},pricingMarginOverrides:{trojanDeck:!1,brokeredDeck:!1,joists:!1},vendorPlan:null,suppliers:{columns:[],rows:[],draftRows:[],isLoaded:!1,isEditing:!1,isLoading:!1,loadError:"",nameColumnKey:""}},xs=document.getElementById("page-project"),$=document.getElementById("page-takeoff"),Ui=document.getElementById("page-deck"),Fs=document.getElementById("page-joist"),de=document.getElementById("page-pricing"),Ut=document.getElementById("page-admin"),qe=document.getElementById("page-suppliers"),wt=document.getElementById("mainTabsNav"),Bn=Array.from(document.querySelectorAll("[data-main-tab]")),Js=Ui.querySelector(".totals-summary-block"),_s=document.getElementById("projectNameDisplay"),Ae=document.getElementById("projectNameInput"),At=document.getElementById("takeoffBidNoInput"),ht=document.getElementById("takeoffJobNumberInput"),yt=document.getElementById("takeoffJobNameInput"),kt=document.getElementById("takeoffProjectLocationInput"),ze=document.getElementById("takeoffAddAreaButton"),Nt=document.getElementById("takeoffDoneButton"),He=document.getElementById("takeoffAreasList"),ae=document.getElementById("projectLocationInput"),Gt=document.getElementById("projectComplexityInput"),nt=document.getElementById("submittalsLeadTimeInput"),it=document.getElementById("fabricationLeadTimeInput"),Lt=document.getElementById("takeoffByTrojanInput"),jt=document.getElementById("cutListProvidedInput"),Ot=document.getElementById("specsReviewedInput"),Ct=document.getElementById("milesFromTrojanInput"),wi=document.getElementById("projectNextButton"),Vs=document.getElementById("adminOpenButton"),qs=document.getElementById("adminBackButton"),zs=document.getElementById("adminCloseButton"),Ke=document.getElementById("adminSuppliersButton"),Hs=document.getElementById("adminChangelogButton"),st=document.getElementById("adminSectionsList"),Bi=document.getElementById("adminChangelogDialog"),xn=document.getElementById("adminChangelogList"),Ks=document.getElementById("adminChangelogCloseButton"),Bt=document.getElementById("resetProjectSideBtn"),xi=Array.from(document.querySelectorAll('input[name="scopeInput"]')),Ws=document.getElementById("deckBackButton"),ve=document.getElementById("deckNextButton"),Ys=document.getElementById("joistBackButton"),Fi=document.getElementById("joistNextButton"),Qs=document.getElementById("pricingBackButton"),We=document.getElementById("resetProjectBtn"),Xs=document.getElementById("pricingStartButton"),xt=document.getElementById("pricingOptimizeButton"),Ye=document.getElementById("pricingProposalButton"),pt=document.getElementById("pricingOptimizeResults"),re=document.getElementById("supplierInput"),W=document.getElementById("joistItemsList"),se=document.getElementById("addJoistButton"),Ft=document.getElementById("joistReviewButton"),Zt=document.getElementById("joistReviewSummary"),It=document.getElementById("deckProfilesList"),fn=document.getElementById("duplicateProfileDialog"),Ji=document.getElementById("duplicateProfileSelect"),Zs=document.getElementById("duplicateConfirmButton"),to=document.getElementById("duplicateCancelButton"),eo=document.getElementById("totalDeckSqsOutput"),_i=document.getElementById("deckTotalOutput"),no=document.getElementById("totalDeckTonsOutput"),Fn=document.getElementById("pricingJoistsTotalOutput"),Jn=document.getElementById("pricingDeckSqsOutput"),_n=document.getElementById("pricingDeckTotalOutput"),Vn=document.getElementById("pricingDeckTonsOutput"),qn=document.getElementById("pricingTrojanShippingRow"),zn=document.getElementById("pricingTrojanShippingCost"),Hn=document.getElementById("pricingTrojanShippingMeta"),Kn=document.getElementById("grandTotalOutput"),Wn=document.getElementById("deckTrojanTonsOutput"),Yn=document.getElementById("deckBrokeredTonsOutput"),Qn=document.getElementById("pricingTrojanDeckSchedule"),Xn=document.getElementById("pricingBrokeredDeckSchedule"),Zn=document.getElementById("pricingJoistVendorSchedule"),ti=document.getElementById("pricingBrokeredDeckName"),ei=document.getElementById("pricingJoistsName"),ni=document.getElementById("pricingTrojanHeaderCogs"),ii=document.getElementById("pricingAccessoriesHeaderCogs"),si=document.getElementById("pricingBrokeredHeaderCogs"),oi=document.getElementById("pricingJoistsHeaderCogs"),ai=document.getElementById("pricingDetailingHeaderCogs"),ri=document.getElementById("pricingTonnageTotalOutput"),ci=document.getElementById("pricingSubtotalOutput"),li=document.getElementById("pricingProjectTotalCostOutput"),di=document.getElementById("pricingMarginSummaryOutput"),ke=document.getElementById("pricingTrojanDeckSection"),Qe=document.getElementById("pricingBrokeredDeckSection"),Xe=document.getElementById("pricingAccessoriesSection"),Ze=document.getElementById("pricingJoistsSection"),tn=document.getElementById("pricingDetailingSection"),io=document.getElementById("pricingTrojanDeckContent"),so=document.getElementById("pricingBrokeredDeckContent"),oo=document.getElementById("pricingAccessoriesContent"),ao=document.getElementById("pricingJoistsContent"),ro=document.getElementById("pricingDetailingContent"),ui=document.getElementById("pricingTrojanDeckCogs"),pi=document.getElementById("pricingAccessoriesSchedule"),mi=document.getElementById("pricingDetailingSchedule"),Jt=document.getElementById("suppliersEditButton"),_t=document.getElementById("suppliersSaveButton"),Vt=document.getElementById("suppliersCancelButton"),qt=document.getElementById("suppliersAddRowButton"),en=document.getElementById("suppliersBackButton"),gi=document.getElementById("suppliersStatusText"),ct=document.getElementById("suppliersTableContainer"),Ee=typeof window<"u"&&window.DECK_LBS_PER_SQ&&typeof window.DECK_LBS_PER_SQ=="object"?window.DECK_LBS_PER_SQ:{},q={depth:["0.6","1.0","1.3","1.5","2.0","3.0","3.5","4.0"],manufacturer:["Trojan","CSC","CANO","Cutting Edge","Cordeck","CSM","HoustonBDeck"],profile:["B","BA","BI","BIA","BP","BPA","C","CSV","D","D FormLok","DA","DA FormLok","E","N-24","NA-24","NI-24","NI-32","NIA-24","NIA-32","NL-32","NLA-32","NP-24","NP-32","NPA-24","NPA-32","TORIS","VL","VLI","VLP","VLPA","VLR"],gage:["16","18","19","20","22","24","26","28","16/18","18/16","18/20","20/18"],finish:["G30","G60","G90","UNC"],paintTop:["G","W","N"],paintBottom:["G","W","N"],grade:["33","40","50","80"]},co=[{value:"",label:""},{value:"SQS",label:"SQS"},{value:"SqFt",label:"SqFt"},{value:"LF",label:"LF"},{value:"Cut List",label:"Cut List"}],lo={americanSteelRequired:"AMERICAN STEEL REQUIRED",americanManufacturing:"AMERICAN MANUFACTURING",sdiManufacturer:"SDI MANUFACTURER",specifiedManufacturer:"SPECIFIED MANUFACTURER"},uo=["#10TEKSCREWS","#12TEKSCREWS","CC1","CC2","CC3"];let bn=1,kn=1,Cn=1,ue=1,Sn=1,he=1;const po=["depth","profile","gage","finish","grade"],mo=["depth","profile","gage","finish"],Vi=["K-SERIES","LH-SERIES","DLH-SERIES","SP-SERIES","GIRDERS","BRIDGING"];let Ce=!1,Se=null;const go=new WeakMap;let fi=null,Mt="",bi=0,rt=null;function y(t){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}function Y(t){return new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:0}).format(t)}function G(t){const e=Number.isFinite(t)&&t>0?t:0;return new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)}function g(t){const e=Number(t);return Number.isNaN(e)||e<=0?0:e}function $t(t){return!t||!Object.prototype.hasOwnProperty.call(i.pricingMargins,t)?0:g(i.pricingMargins[t])}function tt(t,e){const n=$t(e),s=t*(n/100);return{marginPercent:n,marginAmount:s,totalWithMargin:t+s}}const ki=["TROJAN","CSC","CANO","CUTTING EDGE","CORDECK","CSM","HOUSTON B DECK","HOUSTONBDECK"];function vn(){return v(i.admin.sections.trojan.values.minimumProjectMargin||4e3)}function qi(t,e){const n=g(e);if(!Array.isArray(t)||t.length===0||n<=0)return;let s=t.reduce((a,r)=>a+g(r.marginAmount),0),o=Math.max(0,n-s);if(!(o<=0))for(let a=0;a<ki.length&&!(o<=0);a+=1){const r=ki[a],c=dt(r),l=t.find(d=>dt(d.supplier)===c);l&&(l.locked||g(l.subtotalCost)<=0||(l.marginAmount+=o,typeof l.sync=="function"&&l.sync(l.marginAmount),s+=o,o=Math.max(0,n-s)))}}function v(t,e={}){const{blankAsZero:n=!0}=e;if(t==null)return n?0:Number.NaN;const s=String(t).trim();if(s==="")return n?0:Number.NaN;const o=s.replace(/[^0-9.]/g,"");if(o==="")return n?0:Number.NaN;const a=o.indexOf("."),r=a===-1?o:`${o.slice(0,a)}.${o.slice(a+1).replace(/\./g,"")}`,c=Number.parseFloat(r);return Number.isNaN(c)||c<0?0:c}function M(t,e={}){const{blankAsEmpty:n=!1}=e;if(n&&(t===""||t===null||t===void 0))return"";const s=v(t);return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(s)}function fo(t){const e=new Date(t);return new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(e)}function Ht(){const t={};Object.keys(mt).forEach(e=>{t[e]={},mt[e].fields.forEach(n=>{n.type==="text"?t[e][n.key]=String(i.admin.sections[e].values[n.key]||"").trim():t[e][n.key]=v(i.admin.sections[e].values[n.key])})}),t.csc=le(i.admin.sections.csc.values),t.cano=Re(i.admin.sections.cano.values),t.detailing=lt(i.admin.sections.detailing.values),t.trojan.documentConditions=gn(i.admin.sections.trojan.values.documentConditions),t.leadTimes=Dt({trojan:i.admin.sections.trojan.values.leadTimes,csc:i.admin.sections.csc.values.leadTimes,cano:i.admin.sections.cano.values.leadTimes}),localStorage.setItem(Ni,JSON.stringify(t)),localStorage.setItem(hi,String(v(i.admin.sections.trojan.values.minimumProjectMargin))),localStorage.setItem(yi,JSON.stringify(lt(i.admin.sections.detailing.values).buckets)),localStorage.setItem(Ai,JSON.stringify(i.admin.changelog))}function bo(){var o;i.admin=Ri();const t=localStorage.getItem(Ni);if(t)try{const a=JSON.parse(t);Object.keys(mt).forEach(c=>{const l=mt[c].fields,d=a==null?void 0:a[c];!d||typeof d!="object"||l.forEach(p=>{Object.prototype.hasOwnProperty.call(d,p.key)&&(p.type==="text"?i.admin.sections[c].values[p.key]=String(d[p.key]||"").trim():i.admin.sections[c].values[p.key]=v(d[p.key]))})}),i.admin.sections.csc.values=le(a==null?void 0:a.csc),i.admin.sections.cano.values=Re(a==null?void 0:a.cano),i.admin.sections.detailing.values=lt(a==null?void 0:a.detailing),i.admin.sections.trojan.values.documentConditions=gn((o=a==null?void 0:a.trojan)==null?void 0:o.documentConditions);const r=Dt(a==null?void 0:a.leadTimes);i.admin.sections.trojan.values.leadTimes=r.trojan,i.admin.sections.csc.values.leadTimes=r.csc,i.admin.sections.cano.values.leadTimes=r.cano}catch{}const e=localStorage.getItem(yi);if(e)try{const a=JSON.parse(e);i.admin.sections.detailing.values=lt({...i.admin.sections.detailing.values,buckets:a})}catch{}const n=localStorage.getItem(hi);if(n!==null){const a=v(n);i.admin.sections.trojan.values.minimumProjectMargin=a}const s=localStorage.getItem(Ai);if(s)try{const a=JSON.parse(s);Array.isArray(a)&&(i.admin.changelog=a)}catch{}he=i.admin.sections.trojan.values.documentConditions.reduce((a,r)=>Math.max(a,Number.parseInt(String((r==null?void 0:r.id)??""),10)||0),0)+1}function P(){const t={projectName:i.projectName,projectLocation:i.projectLocation,projectComplexityTier:i.projectComplexityTier,submittalsLeadTime:i.submittalsLeadTime,fabricationLeadTime:i.fabricationLeadTime,takeoffByTrojan:i.takeoffByTrojan,cutListProvided:i.cutListProvided,specsReviewed:i.specsReviewed,milesFromTrojanFacility:i.milesFromTrojanFacility,scope:i.scope,deckSpecsCollapsed:i.deckSpecsCollapsed,deckReviewMode:i.deckReviewMode,joistReviewMode:i.joistReviewMode,deckFlags:{...i.deckFlags},deckFlagSelectionOrder:Array.isArray(i.deckFlagSelectionOrder)?[...i.deckFlagSelectionOrder]:[],deckProfiles:Array.isArray(i.deckProfiles)?i.deckProfiles.map(e=>({...e})):[],accessories:Array.isArray(i.accessories)?i.accessories.map(e=>({...e})):[],joists:{...i.joists},joistItems:Array.isArray(i.joistItems)?i.joistItems.map(e=>({...e})):[],takeoff:{...i.takeoff,areas:Array.isArray(i.takeoff.areas)?i.takeoff.areas.map(e=>({...e,deckLines:Array.isArray(e.deckLines)?e.deckLines.map(n=>({...n})):[],joistGroups:Array.isArray(e.joistGroups)?e.joistGroups.map(n=>({...n,marks:Array.isArray(n.marks)?n.marks.map(s=>({...s})):[]})):[]})):[]},pricingMargins:{...i.pricingMargins},pricingMarginOverrides:{...i.pricingMarginOverrides},pricingDetailing:{...i.pricingDetailing},appliedOptimizationSelection:{...i.appliedOptimizationSelection},pricingSections:{...i.pricingSections},currentPage:i.currentPage};try{localStorage.setItem(mn,JSON.stringify(t))}catch{}}function ko(){try{const t=localStorage.getItem(mn);if(!t)return;const e=JSON.parse(t);if(!e||typeof e!="object")return;i.projectName=String(e.projectName??i.projectName),i.projectLocation=String(e.projectLocation??i.projectLocation),i.projectComplexityTier=String(e.projectComplexityTier??i.projectComplexityTier),i.submittalsLeadTime=String(e.submittalsLeadTime??i.submittalsLeadTime),i.fabricationLeadTime=String(e.fabricationLeadTime??i.fabricationLeadTime),i.takeoffByTrojan=String(e.takeoffByTrojan??i.takeoffByTrojan).toUpperCase()==="NO"?"NO":"YES",i.cutListProvided=String(e.cutListProvided??i.cutListProvided).toUpperCase()==="YES"?"YES":"NO",i.specsReviewed=String(e.specsReviewed??i.specsReviewed).toUpperCase()==="YES"?"YES":"NO",i.milesFromTrojanFacility=String(e.milesFromTrojanFacility??i.milesFromTrojanFacility),i.scope="joist-deck",i.deckSpecsCollapsed=!!e.deckSpecsCollapsed,i.deckReviewMode=!!e.deckReviewMode,i.joistReviewMode=!!e.joistReviewMode,e.deckFlags&&typeof e.deckFlags=="object"&&(i.deckFlags={...i.deckFlags,...e.deckFlags}),Array.isArray(e.deckFlagSelectionOrder)&&(i.deckFlagSelectionOrder=[...e.deckFlagSelectionOrder]),Array.isArray(e.deckProfiles)&&(i.deckProfiles=e.deckProfiles.map(o=>({...Ge(),...o}))),Array.isArray(e.accessories)&&(i.accessories=e.accessories.map(o=>({...ss(),...o}))),e.joists&&typeof e.joists=="object"&&(i.joists={...i.joists,...e.joists}),Array.isArray(e.joistItems)&&(i.joistItems=e.joistItems.map(o=>({...os(),...o}))),e.takeoff&&typeof e.takeoff=="object"&&(i.takeoff={...i.takeoff,...e.takeoff,areas:Array.isArray(e.takeoff.areas)?e.takeoff.areas.map(o=>{const a=rs();return{...a,id:Number(o==null?void 0:o.id)||a.id,name:String((o==null?void 0:o.name)||a.name),isCollapsed:!!(o!=null&&o.isCollapsed),deckLines:Array.isArray(o==null?void 0:o.deckLines)?o.deckLines.map(r=>{const c=as();return{...c,...r,specs:{...c.specs,...r!=null&&r.specs&&typeof r.specs=="object"?r.specs:{}}}}):[],joistGroups:Array.isArray(o==null?void 0:o.joistGroups)?o.joistGroups.map(r=>({...cn(),...r,marks:Array.isArray(r==null?void 0:r.marks)?r.marks.map(c=>({...rn(),...c})):[]})):Array.isArray(o==null?void 0:o.joistLines)?[{...cn(),isCollapsed:!1,marks:o.joistLines.map(r=>({...rn(),...r}))}]:[]}}):[]},!i.takeoff.projectLocation&&typeof e.takeoff.cityState=="string"&&(i.takeoff.projectLocation=e.takeoff.cityState)),e.pricingMargins&&typeof e.pricingMargins=="object"&&(i.pricingMargins={...i.pricingMargins,...e.pricingMargins}),e.pricingMarginOverrides&&typeof e.pricingMarginOverrides=="object"&&(i.pricingMarginOverrides={...i.pricingMarginOverrides,...e.pricingMarginOverrides}),e.pricingDetailing&&typeof e.pricingDetailing=="object"&&(i.pricingDetailing={...i.pricingDetailing,...e.pricingDetailing}),e.appliedOptimizationSelection&&typeof e.appliedOptimizationSelection=="object"&&(i.appliedOptimizationSelection={...i.appliedOptimizationSelection,...e.appliedOptimizationSelection}),e.pricingSections&&typeof e.pricingSections=="object"&&(i.pricingSections={...i.pricingSections,...e.pricingSections}),bn=i.deckProfiles.reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1,kn=i.accessories.reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1,Cn=i.joistItems.reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1;const n=Array.isArray(i.takeoff.areas)?i.takeoff.areas:[];ue=n.flatMap(o=>[...Array.isArray(o.deckLines)?o.deckLines:[],...(Array.isArray(o.joistGroups)?o.joistGroups:[]).flatMap(a=>[a,...Array.isArray(a==null?void 0:a.marks)?a.marks:[]])]).reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1,Sn=n.reduce((o,a)=>Math.max(o,Number(a.id)||0),0)+1,i.takeoff.nextAreaNumber=Math.max(g(i.takeoff.nextAreaNumber)||1,n.length+1)}catch{}}function zi(){localStorage.removeItem(mn),localStorage.removeItem(Li)}function Co(){rt&&(window.clearTimeout(rt),rt=null),i.projectName="",i.projectLocation="",i.projectComplexityTier="2",i.submittalsLeadTime="",i.fabricationLeadTime="",i.takeoffByTrojan="YES",i.cutListProvided="NO",i.specsReviewed="NO",i.milesFromTrojanFacility="",i.scope="joist-deck",i.adminReturnPage="project",i.deckSpecsCollapsed=!1,i.deckReviewMode=!1,i.joistReviewMode=!1,i.deckFlags={americanSteelRequired:!1,americanManufacturing:!1,sdiManufacturer:!1,specifiedManufacturer:!1,specifiedManufacturerName:""},i.deckFlagSelectionOrder=[],i.deckProfiles=[],i.accessories=[],i.joists={supplier:"CSC",tons:""},i.joistItems=[],i.takeoff={bidNo:"",jobNumber:"",jobName:"",projectLocation:"",areas:[],nextAreaNumber:1},i.totals={joistsTotal:0,totalDeckSqs:0,deckTotal:0,totalDeckTons:0,trojanDeckTons:0,brokeredDeckTons:0,trojanShipping:0,trojanShippingTrucks:0,trojanShippingMiles:0,trojanShippingRate:0,grandTotal:0},i.pricingSections={trojanDeck:!0,brokeredDeck:!0,accessories:!1,joists:!0,detailing:!0},i.pricingOptimizationVisible=!1,i.pricingOptimizationLoading=!1,i.pricingOptimizationScenarios=[],i.appliedOptimizationSelection={deckMode:"auto",deckVendor:"",deckAssignments:[],joistVendor:"",label:""},i.pricingMargins={trojanDeck:15,brokeredDeck:5,joists:5},i.pricingMarginOverrides={trojanDeck:!1,brokeredDeck:!1,joists:!1},i.pricingDetailing={detailingPercentAuto:0,detailingPercentOverride:null,detailingAmount:0,subtotal:0,finalTotal:0},i.vendorPlan=null,bn=1,kn=1,Cn=1,ue=1,Sn=1}function Hi(){Co(),Ae&&(Ae.value=""),ae&&(ae.value=""),Gt&&(Gt.value="2"),nt&&(nt.value=""),it&&(it.value=""),Lt&&(Lt.value="YES"),jt&&(jt.value="NO"),Ot&&(Ot.value="NO"),Ct&&(Ct.value=""),At&&(At.value=""),ht&&(ht.value=""),yt&&(yt.value=""),kt&&(kt.value=""),xi.forEach(t=>{t.checked=!1}),re&&(re.value=i.joists.supplier),En(),F(),gt(),R(),Et(),z(),O(),et("project")}function U(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function So(t){if(!Array.isArray(t)||t.length===0)return[];const e=t.find(n=>n&&typeof n=="object");return e?Object.keys(e):[]}function Ki(t,e){return!Array.isArray(t)||!Array.isArray(e)?[]:t.filter(n=>n&&typeof n=="object").map(n=>{const s={};return e.forEach(o=>{s[o]=String(n[o]??"").trim()}),s}).filter(n=>e.some(s=>n[s]!==""))}function vo(t){const e=t.map(a=>({key:a,text:String(a||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()})),n=e.find(a=>a.text==="name"||a.text==="supplier name");if(n)return n.key;const s=e.find(a=>a.text.includes("name"));if(s)return s.key;const o=e.find(a=>a.text.includes("supplier"));return o?o.key:""}function Te(t){gi&&(gi.textContent=t)}function Eo(t,e,n){for(let s=0;s<t.length;s+=1){const o=t[s];if(e.every(r=>String(o[r]||"").trim()===""))return{isValid:!1,message:`Row ${s+1} cannot be blank.`};if(n&&String(o[n]||"").trim()==="")return{isValid:!1,message:`Row ${s+1} is missing ${n}.`}}return{isValid:!0,message:""}}function To(t){i.suppliers.isEditing=t,Jt==null||Jt.classList.toggle("hidden",t),_t==null||_t.classList.toggle("hidden",!t),Vt==null||Vt.classList.toggle("hidden",!t),qt==null||qt.classList.toggle("hidden",!t)}function No(){if(!ct)return;const t=i.suppliers.columns,e=i.suppliers.isEditing?i.suppliers.draftRows:i.suppliers.rows;if(!i.suppliers.isLoaded&&i.suppliers.isLoading){ct.innerHTML="";return}if(t.length===0){ct.innerHTML='<p class="help-text">No supplier data available.</p>';return}const n=t.map(a=>`<th>${U(a)}</th>`).join(""),s=i.suppliers.isEditing?"<th>Actions</th>":"",o=e.map((a,r)=>{const c=t.map(d=>{const p=String(a[d]??"");return i.suppliers.isEditing?`<td><input type="text" data-suppliers-row="${r}" data-suppliers-column="${U(d)}" value="${U(p)}" /></td>`:`<td>${U(p)}</td>`}).join(""),l=i.suppliers.isEditing?`<td><button type="button" class="btn-secondary suppliers-delete-row-button" data-suppliers-delete-row="${r}">Delete</button></td>`:"";return`<tr>${c}${l}</tr>`}).join("");ct.innerHTML=`
    <div class="suppliers-table-scroll">
      <table class="suppliers-table">
        <thead>
          <tr>${n}${s}</tr>
        </thead>
        <tbody>${o}</tbody>
      </table>
    </div>
  `}function St(){if(To(i.suppliers.isEditing),i.suppliers.loadError)Te(i.suppliers.loadError);else if(!i.suppliers.isLoaded&&i.suppliers.isLoading)Te("Loading suppliers...");else{const t=i.suppliers.rows.length;Te(`${t} row${t===1?"":"s"} loaded.`)}No()}async function Wi(){if(!(i.suppliers.isLoaded||i.suppliers.isLoading)){i.suppliers.isLoading=!0,i.suppliers.loadError="",St();try{let t=[],e=!1,n=null;try{n=localStorage.getItem(Gi)}catch{n=null}if(n)try{const a=JSON.parse(n);Array.isArray(a)&&(t=a,e=!0)}catch{}if(!e)try{const a=await fetch("data/suppliers.json",{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const r=await a.json();Array.isArray(r)&&(t=r)}catch{i.suppliers.loadError="Unable to load suppliers data."}const s=So(t),o=Ki(t,s);i.suppliers.columns=s,i.suppliers.rows=o,i.suppliers.draftRows=o.map(a=>({...a})),i.suppliers.nameColumnKey=vo(s),i.suppliers.isLoaded=!0,i.suppliers.isEditing=!1}finally{i.suppliers.isLoading=!1,St()}}}function Yi(t,e,n){let s=String(t||"").trim();const o=String(e||"").trim().replace(/ /g,""),a=String(n||"").trim();return s.endsWith(".0")&&(s=s.slice(0,-2)),`${s}${o}${a}`.toUpperCase()}function Ue(){return["project","deck","joist","pricing"]}function En(){const t=i.projectName.trim();_s.textContent=t===""?"PROJECT":t.toUpperCase()}function dt(t){return String(t||"").trim().toUpperCase()}function Ao(){return i.deckProfiles.some(t=>dt(t.specs.manufacturer)==="TROJAN")}function ho(){return Ao()}function yo(){const t=[];return i.projectName.trim()===""&&t.push("MISSING: PROJECT NAME"),i.projectLocation.trim()===""&&t.push("MISSING: PROJECT LOCATION"),ho()&&g(i.milesFromTrojanFacility)<=0&&t.push("MISSING: MILES FROM TROJAN FACILITY"),t}function Go(){const t=[];return i.deckProfiles.length===0?(t.push("MISSING: AT LEAST 1 DECK PROFILE"),t):(i.deckProfiles.forEach((e,n)=>{const s=n+1;["depth","profile","gage","finish","grade"].forEach(o=>{(e.specs[o]||"")===""&&t.push(`MISSING: DECK PROFILE #${s}: ${o.toUpperCase()}`)}),e.rowSqs<=0&&t.push(`MISSING: DECK PROFILE #${s}: TOTAL PROFILE SQS`),e.requiresOverride&&g(e.overrideTons)<=0&&t.push(`MISSING: DECK PROFILE #${s}: OVERRIDE TONS`)}),t)}function Lo(){const t=[];return(i.joists.supplier||"").trim()===""&&t.push("MISSING: SUPPLIER"),i.joistItems.length===0&&t.push("MISSING: AT LEAST 1 JOIST"),g(i.joists.tons)<=0&&t.push("MISSING: JOIST TONS"),t}function Wt(){return yo().length===0}function jo(){return Go().length===0}function Qi(){return Lo().length===0}function te(t){i.milesFromTrojanFacility=t,Ct&&(Ct.value=t),O()}function Oo(t={}){const{force:e=!1}=t,n=String(i.admin.sections.trojan.values.facilityAddress||"").trim(),s=String(i.projectLocation||"").trim();if(n===""||s===""){Mt="",te("");return}const o=`${n}::${s}`;!e&&o===Mt||(Mt=o,Xi().then(a=>{var l,d;if(!a||!((d=(l=window.google)==null?void 0:l.maps)!=null&&d.DistanceMatrixService)){Mt="",te("");return}const r=++bi;new window.google.maps.DistanceMatrixService().getDistanceMatrix({origins:[n],destinations:[s],travelMode:window.google.maps.TravelMode.DRIVING,unitSystem:window.google.maps.UnitSystem.IMPERIAL},(p,u)=>{var S,T,E,C;if(r!==bi)return;if(u!=="OK"){Mt="",te("");return}const m=(E=(T=(S=p==null?void 0:p.rows)==null?void 0:S[0])==null?void 0:T.elements)==null?void 0:E[0],f=(C=m==null?void 0:m.distance)==null?void 0:C.value;if((m==null?void 0:m.status)!=="OK"||!Number.isFinite(f)||f<=0){Mt="",te("");return}const k=f/1609.344;te(k.toFixed(1))})}))}function pe(t={}){const{force:e=!1}=t;clearTimeout(fi),fi=setTimeout(()=>{Oo({force:e})},500)}function Xi(){var e,n;if(Ce)return Promise.resolve(!0);if(Se)return Se;const t=typeof window<"u"&&typeof window[Un]=="string"?window[Un].trim():"";return t===""?(console.warn("GOOGLE_MAPS_API_KEY is not set. Address autocomplete is disabled."),Promise.resolve(!1)):(n=(e=window.google)==null?void 0:e.maps)!=null&&n.places?(Ce=!0,Promise.resolve(!0)):(Se=new Promise(s=>{const o=document.createElement("script");o.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(t)}&libraries=places`,o.async=!0,o.defer=!0,o.onload=()=>{var a,r;Ce=!!((r=(a=window.google)==null?void 0:a.maps)!=null&&r.places),s(Ce)},o.onerror=()=>s(!1),document.head.appendChild(o)}),Se)}function Zi(t){document.querySelectorAll(".pac-container").forEach(n=>{n.style.display=t?"":"none"})}function Io(t){if(!t||t.dataset.pacFixBound==="true")return;const e=()=>Zi(!0);t.addEventListener("focus",e),t.addEventListener("click",e),t.addEventListener("input",e),t.dataset.pacFixBound="true"}function nn(t){var n,s;if(!t||(Io(t),t.dataset.gmapsBound==="true")||!((s=(n=window.google)==null?void 0:n.maps)!=null&&s.places))return;const e=new window.google.maps.places.Autocomplete(t,{types:["geocode"],fields:["formatted_address"]});e.addListener("place_changed",()=>{const o=e.getPlace();o!=null&&o.formatted_address&&(t.value=o.formatted_address),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),setTimeout(()=>{t.blur(),Zi(!1)},20)}),go.set(t,{inputElement:t,autocomplete:e}),t.dataset.gmapsBound="true"}function $o(){Xi().then(t=>{if(!t)return;nn(ae),nn(kt),st.querySelectorAll('[data-admin-type="text"]').forEach(n=>nn(n))})}function et(t){const e=Ue();let n=t;n!=="admin"&&n!=="suppliers"&&!e.includes(n)&&(n="project"),n==="admin"&&i.currentPage!=="admin"&&(i.adminReturnPage=i.currentPage),i.currentPage=n,xs.classList.toggle("hidden",n!=="project"),$==null||$.classList.toggle("hidden",n!=="takeoff"),Ui.classList.toggle("hidden",n!=="deck"),Fs.classList.toggle("hidden",n!=="joist"),de.classList.toggle("hidden",n!=="pricing"),Ut==null||Ut.classList.toggle("hidden",n!=="admin"),qe==null||qe.classList.toggle("hidden",n!=="suppliers"),wt==null||wt.classList.toggle("hidden",n==="admin"||n==="suppliers"),Bt==null||Bt.classList.toggle("hidden",n==="admin"||n==="suppliers"),n==="pricing"&&(i.pricingSections.trojanDeck=!0,i.pricingSections.accessories=!0,i.pricingSections.brokeredDeck=!0,i.pricingSections.joists=!0,i.pricingSections.detailing=!0,pe(),Pt()),n==="suppliers"&&Wi(),n==="takeoff"&&R(),z(),Po()}function Po(){Bn.length&&Bn.forEach(t=>{const e=String(t.getAttribute("data-main-tab")||"").trim(),n=i.currentPage===e;t.classList.toggle("is-active",n),t.classList.remove("is-disabled"),t.disabled=!1,t.setAttribute("aria-current",n?"page":"false")})}function ts(){i.adminReturnPage="admin",et("suppliers")}function Tn(){const t=Ue(),e=t.indexOf(i.currentPage);e===-1||e===t.length-1||et(t[e+1])}function Nn(){const t=Ue(),e=t.indexOf(i.currentPage);e<=0||et(t[e-1])}function z(){wi.disabled=!1,i.scope==="deck-only"?ve.textContent="NEXT: PRICING":ve.textContent="NEXT: JOIST",ve.classList.toggle("hidden",!i.deckReviewMode),Fi.classList.toggle("hidden",!i.joistReviewMode)}function An(t){const e=g(t);return e<=0?0:Math.ceil(e)}function es(t,e,n=null){var d,p,u,m;const s=n||ut(),o=String(t||"").trim().toUpperCase(),r=(o==="DECK"?((p=(d=s.csc)==null?void 0:d.deck)==null?void 0:p.buckets)||[]:o==="JOISTS"?((m=(u=s.csc)==null?void 0:u.joists)==null?void 0:m.buckets)||[]:[]).map(f=>({start:v(f.start),end:v(f.end),cost:v(f.cost)}));if(r.length===0)return null;const c=An(e);let l=r.find(f=>c>=f.start&&c<=f.end);return l||(l=[...r].sort((f,k)=>k.end-f.end)[0]),l?{...l,bucketTons:c}:null}function me({vendor:t,scope:e,tons:n,adminPricing:s=null}){var d;const o=String(t).trim().toUpperCase(),a=String(e||"").trim().toUpperCase(),r=g(n),c=s||ut(),l=An(r);if(r<=0)return{pricePerTon:0,rawTons:r,bucketTons:l,bucketStart:null,bucketEnd:null};if(o==="CSC"&&(a==="DECK"||a==="JOISTS")){const p=es(a,r,c);return{pricePerTon:p?v(p.cost):0,rawTons:r,bucketTons:l,bucketStart:p?p.start:null,bucketEnd:p?p.end:null}}if(o==="CANO"&&(a==="DECK"||a==="JOISTS")){const p=v((d=c.cano)==null?void 0:d.perLb);return{pricePerTon:p>0?p*2e3:0,rawTons:r,bucketTons:l,bucketStart:null,bucketEnd:null}}if(o==="TROJAN"&&a==="DECK"){const p=c.trojan||{},u=v(p.coilCostPerLb)+v(p.inboundFreightPerLb)+v(p.laborPerLb);return{pricePerTon:u>0?u*2e3:0,rawTons:r,bucketTons:l,bucketStart:null,bucketEnd:null}}return{pricePerTon:0,rawTons:r,bucketTons:l,bucketStart:null,bucketEnd:null}}function Do(t){const e=es("JOISTS",t);return e?{start:e.start,end:e.end,cost:e.cost,bucketTons:e.bucketTons}:null}function Mo(t){const n=String(t||"").trim().toUpperCase().match(/,\s*([A-Z]{2})(?:\s+\d{5}(?:-\d{4})?)?\s*$/);return n?n[1]:""}function ee(t){return String(t||"").trim().toUpperCase()==="TRUE"}function Ro(t){return String(t||"").split(",").map(e=>e.trim()).filter(Boolean).map(e=>Number.parseFloat(e)).filter(e=>Number.isFinite(e))}function Kt(t){return String(t||"").toUpperCase().replace(/[^A-Z0-9]+/g,"")}function X(t,e){if(!t||typeof t!="object")return;const n=new Set(e.map(o=>Kt(o))),s=Object.entries(t);for(let o=0;o<s.length;o+=1){const[a,r]=s[o];if(n.has(Kt(a)))return r}}function Ci(t){const e=String(X(t,["ID","SUPPLIER ID","supplierId"])||"").trim(),n=String(X(t,["CODE","SUPPLIER CODE","supplierCode"])||"").trim(),s=String(X(t,["NAME","SUPPLIER NAME","supplierName"])||"").trim(),o=String(X(t,["SUPPLIER","supplier","NAME"])||"").trim();return{id:e,code:n,name:s,supplier:o,canonical:dt(o||s||n||e)}}function Uo(t){const e=dt(t);return e?e.includes("TROJAN")?"TROJAN":e.includes("CSC")?"CSC":e.includes("CANO")?"CANO":e.includes("CUTTING")&&e.includes("EDGE")?"CUTTING EDGE":e.includes("CORDECK")?"CORDECK":e.includes("HOUSTON")&&e.includes("DECK")?"HOUSTONBDECK":e==="CSM"?"CSM":e:""}function hn(t){const e=String(t||""),n=dt(e),s=ce();let o=null;n&&(o=s.find(c=>{const l=Ci(c);return[l.id,l.code,l.name,l.supplier].map(p=>dt(p)).filter(Boolean).includes(n)})||null);const a=o?Ci(o):null,r=(a==null?void 0:a.canonical)||n;return{selectedRaw:e,normalizedSelected:n,matchedRow:o,pricingSupplier:Uo(r)}}function Yt(t){const e=String(X(t,["SUPPLIER","supplier","NAME"])||"").trim().toUpperCase(),n=Number.parseInt(String(X(t,["PRIORITY","priority"])??""),10),s=String(X(t,["DECK LOCATION","deckLocation"])||"").trim().toUpperCase(),o=new Set(["SUPPLIER","DECK","DEPTH","JOISTS","AMERICAN STEEL REQUIRED","AMERICAN MANUFACTURING","SDI MANUFACTURING","SDI MANUFACTURER","PRIORITY","JOIST LOCATION","DECK LOCATION"].map(r=>Kt(r))),a={};return Object.entries(t||{}).forEach(([r,c])=>{const l=Kt(r);if(!l||o.has(l))return;const d=String(c||"").trim().toUpperCase();(d==="TRUE"||d==="FALSE")&&(a[l]=d==="TRUE")}),{supplier:e,deck:ee(X(t,["DECK"])),joists:ee(X(t,["JOISTS"])),depths:Ro(X(t,["DEPTH"])),americanSteelRequired:ee(X(t,["AMERICAN STEEL REQUIRED"])),americanManufacturing:ee(X(t,["AMERICAN MANUFACTURING"])),sdiManufacturing:ee(X(t,["SDI MANUFACTURING","SDI MANUFACTURER"])),priority:Number.isFinite(n)?n:Number.MAX_SAFE_INTEGER,deckLocation:s,profileAvailability:a}}function ce(){return Array.isArray(i.suppliers.rows)&&i.suppliers.rows.length>0&&i.suppliers.rows.map(n=>Yt(n)).filter(n=>n.supplier!=="").some(n=>n.deck&&n.depths.length>0&&n.priority<Number.MAX_SAFE_INTEGER)?i.suppliers.rows:Pi}function wo(t){const e=dt(t);return e?q.manufacturer.find(s=>dt(s)===e)||t:""}function vt(t,e,n){var a;if(t==="TROJAN"){const r=n.trojan||{},c=v(r.coilCostPerLb)+v(r.inboundFreightPerLb)+v(r.laborPerLb);return c>0?c*2e3:0}if(t==="CSC")return me({vendor:"CSC",scope:"DECK",tons:e,adminPricing:n}).pricePerTon;if(t==="CANO"){const r=v((a=n.cano)==null?void 0:a.perLb);return r>0?r*2e3:0}const s=vt("CSC",e,n),o={"CUTTING EDGE":1,CORDECK:1.03,CSM:1.05,HOUSTONBDECK:1.08}[t]||1.08;return s>0?s*o:0}function Bo(t,e,n){var s;if(t==="CSC")return me({vendor:"CSC",scope:"JOISTS",tons:e,adminPricing:n}).pricePerTon;if(t==="CANO"){const o=v((s=n.cano)==null?void 0:s.perLb);return o>0?o*2e3:0}return 0}function ye(t,e){var s;if(!t||e.sdiManufacturer)return!1;const n=String(((s=t.specs)==null?void 0:s.depth)||"").trim();return!(n!=="1.5"&&n!=="2.0")}function xo(t,e){return!(t==="CANO"&&(e.americanSteelRequired||e.americanManufacturing)||t==="TROJAN"&&e.sdiManufacturer)}function ns(t,e){var Q,ot,at;const n=t.deckFlags||{},s=t.deckLines||[],o=t.scope||"",a=o==="joists-only"||o==="joist-deck",r=o==="deck-only",c=Mo(t.projectLocation),l=Array.isArray(t.supplierRules)?t.supplierRules.map(Yt).filter(N=>N.supplier!==""):[],d=["CSC","CANO"].filter(N=>xo(N,n)),p=l.filter(N=>N.joists&&d.includes(N.supplier)&&N.priority<Number.MAX_SAFE_INTEGER);function u(N){return[...N].sort((I,A)=>{if(I.priority!==A.priority)return I.priority-A.priority;const x=I.deckLocation!==""&&I.deckLocation===c?1:0,H=A.deckLocation!==""&&A.deckLocation===c?1:0;return x!==H?H-x:I.supplier.localeCompare(A.supplier)})}let m=a?((Q=u(p)[0])==null?void 0:Q.supplier)||"CSC":null;const f=[],k=["CUTTING EDGE","CORDECK","CSM","HOUSTONBDECK"];function S(N){var H,K;if(!N)return[];const I=Number.parseFloat(String(((H=N.specs)==null?void 0:H.depth)||"").trim());if(!Number.isFinite(I))return[];const A=Kt(String(((K=N.specs)==null?void 0:K.profile)||"").trim());return l.filter(_=>!(!_.deck||n.americanSteelRequired&&!_.americanSteelRequired||n.americanManufacturing&&!_.americanManufacturing||n.sdiManufacturer&&!_.sdiManufacturing)).filter(_=>_.depths.some(be=>Math.abs(be-I)<1e-4)?!A||!_.profileAvailability||!Object.prototype.hasOwnProperty.call(_.profileAvailability,A)?!0:!!_.profileAvailability[A]:!1)}function T(N){return[...N].sort((I,A)=>{if(I.priority!==A.priority)return I.priority-A.priority;const x=I.deckLocation!==""&&I.deckLocation===c?1:0,H=A.deckLocation!==""&&A.deckLocation===c?1:0;return x!==H?H-x:I.supplier.localeCompare(A.supplier)})}s.forEach((N,I)=>{var $n,Pn,Dn;const A=g(N.rowTons),x=String((($n=N==null?void 0:N.specs)==null?void 0:$n.depth)||"").trim(),H=String(((Pn=N==null?void 0:N.specs)==null?void 0:Pn.profile)||"").trim();let K=null,_="";const Xt=S(N),be=String(n.specifiedManufacturerName||"").trim().toUpperCase();if(!K){const bt=x==="1.5"||x==="2.0",Ve=!n.sdiManufacturer;bt&&Ve&&(K="TROJAN",_="Trojan preferred for 1.5/2.0 depth")}if(!K&&n.specifiedManufacturer&&be&&H&&Xt.length>0){const bt=Xt.find(Ve=>Ve.supplier===be);bt&&(K=bt.supplier,_="Specified manufacturer override")}if(!K&&Xt.length>0){const bt=T(Xt);K=bt[0].supplier,_=`Supplier rules priority ${bt[0].priority}`}K||(K=(r?k:[...d,...k])[0]||"CSC",_="Fallback vendor (no supplier rule match)");const In=vt(K,A,e);f.push({lineId:N.id,lineIndex:I,profile:N.profileName||((Dn=N.specs)==null?void 0:Dn.profile)||"",sqs:g(N.rowSqs),vendor:K,reason:_,tons:A,pricePerTon:In,extendedTotal:A*In})});const E=f.filter(N=>N.vendor==="TROJAN").reduce((N,I)=>N+I.tons,0),C=f.filter(N=>N.vendor!=="TROJAN").reduce((N,I)=>N+I.tons,0);if(a){const N=new Set(f.map(A=>String(A.vendor||"").trim().toUpperCase())),I=p.filter(A=>N.has(A.supplier));I.length>0?m=u(I)[0].supplier:p.length>0&&(m=u(p)[0].supplier)}const b={};f.filter(N=>N.tons>0).forEach(N=>{b[N.vendor]||(b[N.vendor]={vendor:N.vendor,tons:0,pricePerTon:N.pricePerTon,extendedTotal:0}),b[N.vendor].tons+=N.tons,b[N.vendor].extendedTotal+=N.extendedTotal});const h=Object.values(b).filter(N=>N.vendor==="TROJAN"),L=Object.values(b).filter(N=>N.vendor!=="TROJAN"),j=g(t.joistTons),B=m?Bo(m,j,e):0,Z=m==="CSC"&&j>0&&j<=9?v((at=(ot=e.csc)==null?void 0:ot.joists)==null?void 0:at.extraShippingFee_0_9):0;return{deckAssignments:f,rollups:{trojanDeckTons:E,brokeredDeckTons:C},chosenJoistVendor:m,joistPricePerTon:B,joistExtraShippingFee:Z,pricingSchedule:{trojanDeck:h,trojanDeckLines:f.filter(N=>N.vendor==="TROJAN"),brokeredDeck:L,joists:m?{vendor:m,tons:j,pricePerTon:B,extraShippingFee:Z,total:j*B+Z}:null}}}function Fo(){const t={trojan:{coilCostPerLb:.45,inboundFreightPerLb:.05,laborPerLb:.12},csc:le(Ne()),cano:{perLb:1.89}};return[{name:"SDI blocks Trojan",input:{scope:"deck-only",projectLocation:"Dallas, TX",deckFlags:{sdiManufacturer:!0,americanSteelRequired:!1,americanManufacturing:!1},deckLines:[{id:1,specs:{depth:"1.5",profile:"NIA-24"},rowTons:12}],joistTons:0}},{name:"Depth 3.0 blocks Trojan",input:{scope:"deck-only",projectLocation:"Austin, TX",deckFlags:{sdiManufacturer:!1,americanSteelRequired:!1,americanManufacturing:!1},deckLines:[{id:2,specs:{depth:"3.0",profile:"NP-32"},rowTons:8}],joistTons:0}}].map(n=>({name:n.name,result:ns(n.input,t)}))}function is(){return{sqs:"",sqft:"",lf:"",lfWidthIn:"",pcs:"",cutWidthIn:"",lengthFt:"",inches:""}}function Ge(){return{id:bn++,specs:{depth:"",manufacturer:"",profile:"",gage:"",finish:"",paintTop:"",paintBottom:"",grade:""},manufacturerExplicit:!1,method:"SQS",inputs:is(),overrideTons:"",rowSqFt:0,rowSqs:0,rowTons:0,tonsFromOverride:!1,requiresOverride:!1,showOverride:!0,showWeightWarning:!1,missingLookupMessage:"",lastWarnSignature:"",weightStatus:"INCOMPLETE",isCollapsed:!1}}function ss(){return{id:kn++,type:"",screwCount:null,tons:null,isCollapsed:!1}}function Jo(t){t&&(t.specs.depth="1.5",t.specs.profile="B",t.specs.gage="20",t.specs.finish="G60",t.specs.grade="50",t.specs.manufacturer="",t.manufacturerExplicit=!1,dn(t))}function os(){return{id:Cn++,series:"",units:"",tons:"",isCollapsed:!1}}function as(){return{id:ue++,specs:{depth:"",profile:"",gage:"",finish:"",grade:"",paintTop:"",paintBottom:""},squares:"",isCollapsed:!1}}function rs(){const t=g(i.takeoff.nextAreaNumber)||1;return i.takeoff.nextAreaNumber=t+1,{id:Sn++,name:`TO AREA #${t}`,isCollapsed:!1,deckSectionCollapsed:!1,joistSectionCollapsed:!1,deckLines:[],joistGroups:[],quickLineId:null}}function rn(){return{id:ue++,mark:"",qty:"",type:"",designation:"",uplift:"",oaLengthFt:"",oaLengthIn:""}}function cn(){return{id:ue++,isCollapsed:!1,marks:[]}}function V(t){return i.takeoff.areas.find(e=>Number(e.id)===Number(t))}function yn(){Array.isArray(i.takeoff.areas)||(i.takeoff.areas=[]),i.takeoff.areas.forEach((t,e)=>{t.name=`TOA${e+1}`}),i.takeoff.nextAreaNumber=i.takeoff.areas.length+1}function Si(t){i.takeoff.areas.forEach(e=>{e.isCollapsed=Number(e.id)!==Number(t)})}function cs(t){var r,c,l,d,p;const e=Yi((r=t==null?void 0:t.specs)==null?void 0:r.depth,(c=t==null?void 0:t.specs)==null?void 0:c.profile,(l=t==null?void 0:t.specs)==null?void 0:l.gage),n=String(((d=t==null?void 0:t.specs)==null?void 0:d.finish)||"").trim().toUpperCase(),s=Number(((p=Ee==null?void 0:Ee[e])==null?void 0:p[n])||0),o=g(t==null?void 0:t.squares),a=s>0?o*s/2e3:0;return{lbsPerSquare:s,tons:a}}function _o(t,e){if(!t||!t.specs)return;const n=String(e||"").trim().toUpperCase();if(n==="1.5B20G60GR50"){t.specs.depth="1.5",t.specs.profile="B",t.specs.gage="20",t.specs.finish="G60",t.specs.grade="50";return}if(n==="1.5B22G60GR50"){t.specs.depth="1.5",t.specs.profile="B",t.specs.gage="22",t.specs.finish="G60",t.specs.grade="50";return}n==="2.0VLI20G60GR50"&&(t.specs.depth="2.0",t.specs.profile="VLI",t.specs.gage="20",t.specs.finish="G60",t.specs.grade="50")}function Vo(t,e,n){const s=cs(e),a=[e.specs.depth,e.specs.profile,e.specs.gage,e.specs.finish,e.specs.grade].filter(r=>String(r||"").trim()!=="").join(" ")||"DECK PROFILE";return`
    <div class="takeoff-deck-accordion" data-takeoff-area-id="${t.id}" data-takeoff-line-id="${e.id}">
      <div class="takeoff-deck-header" data-action="toggle-takeoff-deck-line" role="button" tabindex="0" aria-expanded="${!e.isCollapsed}">
        <span class="deck-summary-toggle" aria-hidden="true">${e.isCollapsed?"+":"−"}</span>
        <span class="deck-summary-name">${U(a)}</span>
        <span class="deck-summary-divider" aria-hidden="true">|</span>
        <span class="deck-summary-sqs">SQS: ${G(g(e.squares))}</span>
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
          <div class="field-group"><label>SQS</label><input data-takeoff-field="squares" type="number" min="0" step="0.01" value="${U(e.squares)}" /></div>
          <div class="field-group"><label>Tons</label><input type="text" readonly value="${G(s.tons)}" /></div>
          <button type="button" class="takeoff-remove-btn" data-action="takeoff-remove-deck-line" aria-label="Remove deck line">&times;</button>
        </div>
      </div>
      `}
    </div>
  `}function qo(t,e,n){return`
    <div class="takeoff-joist-row" data-takeoff-area-id="${t.id}" data-takeoff-group-id="${e.id}" data-takeoff-line-id="${n.id}" data-takeoff-kind="joist">
      <div class="field-group"><label>Mark</label><input data-takeoff-field="mark" type="text" value="${U(n.mark)}" /></div>
      <div class="field-group"><label>Qty</label><input data-takeoff-field="qty" type="number" min="0" step="1" value="${U(n.qty)}" /></div>
      <div class="field-group"><label>Type</label><select data-takeoff-field="type">${J([{value:"",label:""},...Vi],n.type)}</select></div>
      <div class="field-group"><label>Designation</label><input data-takeoff-field="designation" type="text" value="${U(n.designation)}" /></div>
      <div class="field-group"><label>Uplift</label><input data-takeoff-field="uplift" type="text" value="${U(n.uplift)}" /></div>
      <div class="field-group"><label>OA Length Ft</label><input data-takeoff-field="oaLengthFt" type="number" min="0" step="1" value="${U(n.oaLengthFt)}" /></div>
      <div class="field-group"><label>OA Length In</label><input data-takeoff-field="oaLengthIn" type="number" min="0" step="1" value="${U(n.oaLengthIn)}" /></div>
      <button type="button" class="takeoff-remove-btn" data-action="takeoff-remove-joist-line" aria-label="Remove joist line">&times;</button>
    </div>
  `}function R(){if(!$||!He)return;if(yn(),!Array.isArray(i.takeoff.areas)||i.takeoff.areas.length===0){He.innerHTML='<p class="takeoff-empty">No takeoff areas yet.</p>',Nt&&Nt.classList.add("hidden");return}He.innerHTML=i.takeoff.areas.map((e,n)=>{const s=e.deckLines.reduce((l,d)=>l+cs(d).tons,0),o=!!e.isCollapsed,a=`TOA${n+1}`,r=!!e.deckSectionCollapsed,c=!!e.joistSectionCollapsed;return`
        <section class="takeoff-area-accordion" data-takeoff-area-id="${e.id}">
          <div class="takeoff-area-header" data-action="toggle-takeoff-area" role="button" tabindex="0" aria-expanded="${!o}">
            <span class="deck-summary-toggle" aria-hidden="true">${o?"+":"−"}</span>
            <span class="deck-summary-name">${U(a)}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-tons">TONS: ${G(s)}</span>
            <button type="button" class="takeoff-area-remove-btn" data-action="takeoff-remove-area" aria-label="Remove ${U(a)}">&times;</button>
          </div>
          ${o?"":`<div class="takeoff-area-content">
                <div class="takeoff-subsection" data-takeoff-area-id="${e.id}" data-takeoff-subsection="deck">
                  <div class="takeoff-subsection-header" data-action="toggle-takeoff-deck-section" role="button" tabindex="0" aria-expanded="${!r}">
                    <span class="deck-summary-toggle" aria-hidden="true">${r?"+":"−"}</span>
                    <span class="deck-summary-name">DECK ${U(a)}</span>
                  </div>
                  ${r?"":`<div class="takeoff-subsection-content">
                        <div class="takeoff-deck-list">
                          ${e.deckLines.length>0?e.deckLines.map((l,d)=>{var m;const p=(m=e.deckLines[e.deckLines.length-1])==null?void 0:m.id,u=Number(e.quickLineId)||Number(p);return Vo(e,l,Number(l.id)===Number(u)||d===e.deckLines.length-1&&!e.quickLineId)}).join(""):""}
                        </div>
                        <div class="takeoff-actions-row takeoff-line-actions">
                          <button type="button" class="btn-secondary" data-action="takeoff-add-deck">+ ADD DECK</button>
                        </div>
                      </div>`}
                </div>
                <div class="takeoff-subsection" data-takeoff-area-id="${e.id}" data-takeoff-subsection="joist">
                  <div class="takeoff-subsection-header" data-action="toggle-takeoff-joist-section" role="button" tabindex="0" aria-expanded="${!c}">
                    <span class="deck-summary-toggle" aria-hidden="true">${c?"+":"−"}</span>
                    <span class="deck-summary-name">JOIST ${U(a)}</span>
                  </div>
                  ${c?"":`<div class="takeoff-subsection-content">
                        <div class="takeoff-joist-list">
                          ${Array.isArray(e.joistGroups)&&e.joistGroups.length>0?e.joistGroups.map((l,d)=>{const p=Array.isArray(l.marks)?l.marks:[];return`
                                      <div class="takeoff-joist-group" data-takeoff-area-id="${e.id}" data-takeoff-group-id="${l.id}">
                                        <div class="takeoff-joist-group-header" data-action="toggle-takeoff-joist-group" role="button" tabindex="0" aria-expanded="${!l.isCollapsed}">
                                          <span class="deck-summary-toggle" aria-hidden="true">${l.isCollapsed?"+":"−"}</span>
                                          <span class="deck-summary-name">MARK ${d+1}</span>
                                          <button type="button" class="takeoff-mark-remove-btn" data-action="takeoff-remove-mark" aria-label="Remove MARK ${d+1}">&times;</button>
                                        </div>
                                        ${l.isCollapsed?"":`<div class="takeoff-joist-group-content">
                                              <div class="takeoff-joist-marks-list">
                                                ${p.length>0?p.map(u=>qo(e,l,u)).join(""):""}
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
      `}).join("");const t=i.takeoff.areas.some(e=>(e.deckLines||[]).some(n=>{var s;return String(((s=n==null?void 0:n.specs)==null?void 0:s.profile)||"").trim()!==""}));Nt&&Nt.classList.toggle("hidden",!t)}function ln(t){return String(t||"").trim().toUpperCase()==="BRIDGING"}function we(t){return i.joistItems.find(e=>e.id===t)}function zo(t){i.joistItems.forEach(e=>{e.isCollapsed=e.id!==t})}function ls(t){const e=we(t);if(!e)return;const n=!e.isCollapsed;i.joistItems.forEach(s=>{s.isCollapsed=!0}),n||(e.isCollapsed=!1)}function Be(){const t=i.joistItems.reduce((e,n)=>e+g(n.tons),0);i.joists.tons=t>0?t.toFixed(2):""}function gt(){if(!W)return;if(i.joistItems.length===0){W.innerHTML='<p class="help-text">No joists added.</p>';return}const t=i.joistItems.map((e,n)=>{const s=e.isCollapsed?"+":"−",o=e.series||`Joist #${n+1}`,a=ln(e.series)?"":`<span class="deck-summary-divider" aria-hidden="true">|</span><span class="deck-summary-sqs">UNITS: ${Y(g(e.units))}</span>`,r=e.isCollapsed?"":`
        <div class="deck-row-content">
          <div class="deck-row-top">
            <p class="deck-row-title">Joist ${n+1}</p>
            <button type="button" class="btn-remove-row btn-remove-joist" aria-label="Remove joist ${n+1}">Remove</button>
          </div>
          <div class="joist-row-grid">
            <div class="field-group">
              <label>Series</label>
              <select data-group="joist" data-field="series">
                ${J([{value:"",label:""},...Vi],e.series)}
              </select>
            </div>
            ${e.series===""||ln(e.series)?"":`<div class="field-group">
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
          <span class="deck-summary-name">${U(o)}</span>
          ${a}
          <span class="deck-summary-divider" aria-hidden="true">|</span>
          <span class="deck-summary-tons">TONS: ${G(g(e.tons))}</span>
        </div>
        ${r}
      </div>
    `}).join("");W.innerHTML=t}function Ho(){if(Zt){if(!i.joistReviewMode||i.joistItems.length===0){Zt.classList.add("hidden"),Zt.innerHTML="";return}Zt.classList.remove("hidden"),Zt.innerHTML=`
    <div class="pricing-line-item">
      <div class="pricing-line-item-main">
        <span>TOTAL JOIST TONS</span>
        <strong>${G(g(i.joists.tons))}</strong>
      </div>
    </div>
  `}}function Et(){if(!se||!Ft)return;const t=i.joistItems.length>0;se.classList.toggle("hidden",i.joistReviewMode),Ft.classList.toggle("hidden",!t),Ft.textContent=i.joistReviewMode?"EDIT":"REVIEW",Ho()}function Le(t){return t==="#10TEKSCREWS"||t==="#12TEKSCREWS"}function je(t){return t==="CC1"||t==="CC2"||t==="CC3"}function ds(t){if(t.manufacturerExplicit)return;const e=t.specs.depth==="1.5"||t.specs.depth==="2.0";if(e&&t.specs.manufacturer===""){t.specs.manufacturer="Trojan";return}!e&&t.specs.manufacturer==="Trojan"&&(t.specs.manufacturer="")}function Rt(t,e){return po.includes(e)?(t.specs[e]||"")==="":!1}function dn(t){if(!t)return;const e=String(t.method||"").trim().toLowerCase().replace(/\s+/g,"");if(e!=="lf"&&e!=="cutlist")return;const n=String(t.specs.profile||"").trim().toUpperCase(),s=n.includes("-24")||n.endsWith("24")||n.includes(" 24"),o=n.includes("-32")||n.endsWith("32")||n.includes(" 32");let a=null;if(s?a="24":o&&(a="32"),!!a){if(e==="lf"){t.inputs.lfWidthIn=a;return}t.inputs.cutWidthIn=a}}function us(t){if(!t)return Ge();const e=Ge();return e.specs.depth=t.specs.depth,e.specs.profile=t.specs.profile,e.specs.gage=t.specs.gage,e.specs.finish=t.specs.finish,e.specs.paintTop=t.specs.paintTop,e.specs.paintBottom=t.specs.paintBottom,e.specs.grade=t.specs.grade,t.specs.manufacturer!==""&&(e.specs.manufacturer=t.specs.manufacturer,e.manufacturerExplicit=!!t.manufacturerExplicit),ds(e),e}function ie(t){i.deckProfiles.forEach(e=>{e.isCollapsed=e.id!==t})}function vi(t){i.accessories.forEach(e=>{e.isCollapsed=e.id!==t})}function ps(t){const e=ft(t);if(!e)return;const n=!e.isCollapsed;i.deckProfiles.forEach(s=>{s.isCollapsed=!0}),n||(e.isCollapsed=!1)}function xe(t){return i.accessories.find(e=>e.id===t)}function ms(t){const e=xe(t);if(!e)return;const n=!e.isCollapsed;i.accessories.forEach(s=>{s.isCollapsed=!0}),n||(e.isCollapsed=!1)}function gs(t){const e=i.admin.sections[t];if(!e)return;const n=!e.isCollapsed;Object.keys(i.admin.sections).forEach(s=>{i.admin.sections[s].isCollapsed=!0}),n||(e.isCollapsed=!1)}function Oe(t){var o;const e=i.admin.sections.csc,n=(o=e==null?void 0:e.subsections)==null?void 0:o[t];if(!n)return;const s=!n.isCollapsed;Object.keys(e.subsections).forEach(a=>{e.subsections[a].isCollapsed=!0}),s||(n.isCollapsed=!1)}function Ie(t){var o;const e=i.admin.sections.trojan,n=(o=e==null?void 0:e.subsections)==null?void 0:o[t];if(!n)return;const s=!n.isCollapsed;Object.keys(e.subsections).forEach(a=>{e.subsections[a].isCollapsed=!0}),s||(n.isCollapsed=!1)}function fs(t){var o;const e=i.admin.sections.cano,n=(o=e==null?void 0:e.subsections)==null?void 0:o[t];if(!n)return;const s=!n.isCollapsed;Object.keys(e.subsections).forEach(a=>{e.subsections[a].isCollapsed=!0}),s||(n.isCollapsed=!1)}function bs(){var e;const t=((e=i.admin.sections.trojan)==null?void 0:e.subsections)||{};return Object.values(t).some(n=>!!(n!=null&&n.isEditing))}function ks(){var e;const t=((e=i.admin.sections.csc)==null?void 0:e.subsections)||{};return Object.values(t).some(n=>!!(n!=null&&n.isEditing))}function Cs(){var e;const t=((e=i.admin.sections.cano)==null?void 0:e.subsections)||{};return Object.values(t).some(n=>!!(n!=null&&n.isEditing))}function Fe(t){const e=t.specs,n=`${e.depth}${e.profile}${e.gage}${e.finish}`.trim(),s=[];if(n!==""&&s.push(n),e.paintTop!==""||e.paintBottom!==""){const o=e.paintTop===""?"-":e.paintTop,a=e.paintBottom===""?"-":e.paintBottom;s.push(`${o}/${a}`)}return e.grade!==""&&s.push(`Gr${e.grade}`),s.length===0?"New Profile":s.join(" ")}function ne(t){t.rowTons>0&&!t.tonsFromOverride&&(t.requiresOverride=!1,t.showOverride=!1)}function Ko(){const t=new Map;return i.deckProfiles.forEach(e=>{var o;const n=String(((o=e==null?void 0:e.specs)==null?void 0:o.manufacturer)||"").trim()||"—",s=t.get(n)||{supplier:n,sqs:0,tons:0};s.sqs+=g(e.rowSqs),s.tons+=g(e.rowTons),t.set(n,s)}),Array.from(t.values())}function Wo(t){var k;const e=t.inputs,n=Object.values(e).some(S=>g(S)>0);let s=0,o=0;if(t.tonsFromOverride=!1,t.method==="SQS")o=g(e.sqs),s=o*100;else if(t.method==="SqFt")s=g(e.sqft),o=s/100;else if(t.method==="LF"){const S=g(e.lf),T=g(e.lfWidthIn);s=S*(T/12),o=s/100}else if(t.method==="Cut List"){const S=g(e.pcs),T=g(e.cutWidthIn),E=g(e.lengthFt),C=g(e.inches),b=E+C/12;s=S*(T/12)*b,o=s/100}t.rowSqFt=s,t.rowSqs=o;const a=t.weightStatus||"INCOMPLETE";if(mo.some(S=>(t.specs[S]||"")==="")){t.weightStatus="INCOMPLETE",t.requiresOverride=!1,t.showOverride=!1,t.showWeightWarning=!1,t.missingLookupMessage="",t.rowTons=0,ne(t);return}const c=Yi(t.specs.depth,t.specs.profile,t.specs.gage),l=String(t.specs.finish||"").toUpperCase(),p=c!==""&&l!==""?(k=Ee[c])==null?void 0:k[l]:void 0;if(Number.isFinite(Number(p))&&Number(p)>0){t.weightStatus="FOUND",a!=="FOUND"&&(t.overrideTons=""),t.showWeightWarning=!1,t.missingLookupMessage="",t.lastWarnSignature="";const S=o*Number(p)/2e3,T=g(t.overrideTons);if(n&&S<=0){t.requiresOverride=!0,t.showOverride=!0,t.rowTons=T>0?T:0,t.tonsFromOverride=T>0,ne(t);return}t.requiresOverride=!1,t.showOverride=!1,t.rowTons=S,ne(t);return}t.weightStatus="NOT_FOUND",t.requiresOverride=n,t.showOverride=n,t.showWeightWarning=!1,t.missingLookupMessage=`MISSING KEY: ${c} / ${l}`;const m=`${c}|${l}`;t.lastWarnSignature!==m&&(console.warn(`MISSING KEY: ${c} / ${l}`),t.lastWarnSignature=m);const f=g(t.overrideTons);if(n&&f>0){t.rowTons=f,t.tonsFromOverride=!0,ne(t);return}t.rowTons=0,t.showWeightWarning=n,ne(t)}function Yo(){let t=0,e=0;return i.deckProfiles.forEach(n=>{Wo(n),t+=n.rowSqs,e+=n.rowTons}),{totalSqs:t,totalTons:e}}function J(t,e){return t.map(n=>{const s=typeof n=="string"?n:n.value,o=typeof n=="string"?n:n.label;return`<option value="${s}" ${s===e?"selected":""}>${o}</option>`}).join("")}function Qo(t){return t.method==="SQS"?`
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
    `:""}function F(){const t=i.deckFlagSelectionOrder.filter(d=>i.deckFlags[d]),e=i.deckSpecsCollapsed?"+":"−",n=i.deckSpecsCollapsed?"":`
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
        ${t.length>0?`<span class="deck-summary-specs-list">${t.map(d=>`<span class="deck-summary-specs-item">${lo[d]||d}</span>`).join("")}</span>`:""}
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
  `,a=Ko(),r=i.deckReviewMode&&a.length>0?`
    <div class="deck-review-summary-block">
      ${a.map(d=>`
        <div class="pricing-line-item">
          <div class="pricing-line-item-main">
            <span>${U(d.supplier)}</span>
            <strong>SQS: ${G(d.sqs)} | TONS: ${G(d.tons)}</strong>
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
  `:"",c=i.accessories.map((d,p)=>{const u=d.type||`Accessory #${p+1}`,m=Le(d.type)?`SCREWS: ${Y(Number.isFinite(d.screwCount)?d.screwCount:0)}`:je(d.type)?`TONS: ${G(g(d.tons))}`:"",f=d.isCollapsed?"+":"−",k=d.isCollapsed?"":`
          <div class="deck-row-content">
            <div class="deck-row-top">
              <p class="deck-row-title">${u}</p>
              <button type="button" class="btn-remove-row btn-remove-accessory" aria-label="Remove accessory ${p+1}">Remove</button>
            </div>
            <div class="deck-method-grid">
              <div class="field-group">
                <label>Accessory Type</label>
                <select data-group="accessory" data-field="type">${J([{value:"",label:""},...uo],d.type)}</select>
              </div>
            </div>
            ${Le(d.type)?`<div class="deck-row-inputs-grid">
              <div class="field-group">
                <label>Screw Count</label>
                <input type="number" min="0" step="1" inputmode="numeric" data-group="accessory" data-field="screwCount" value="${d.screwCount??""}" />
              </div>
            </div>`:""}
            ${je(d.type)?`<div class="deck-row-inputs-grid">
              <div class="field-group">
                <label>Tons</label>
                <input type="number" min="0" step="any" inputmode="decimal" data-group="accessory" data-field="tons" value="${d.tons??""}" />
              </div>
            </div>`:""}
          </div>
        `;return`
        <div class="deck-row" data-accessory-id="${d.id}">
          <div class="deck-summary-row" data-id="a_${d.id}" role="button" tabindex="0" aria-expanded="${!d.isCollapsed}">
            <span class="deck-summary-toggle" aria-hidden="true">${f}</span>
            <span class="deck-summary-name">${u}</span>
            ${m?`<span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-sqs">${m}</span>`:""}
          </div>
          ${k}
        </div>
      `}).join("");if(i.deckProfiles.length===0&&i.accessories.length===0){It.innerHTML=`${s}${o}${r}<p class="help-text">No deck profiles added.</p>`;return}const l=i.deckProfiles.map((d,p)=>{const u=d.isCollapsed?"+":"−",m=d.showOverride&&d.requiresOverride,f=d.isCollapsed?"":`
          <div class="deck-row-content">
            <div class="deck-row-top">
              <p class="deck-row-title">Profile ${p+1}</p>
              <div class="deck-row-actions">
                <button
                  type="button"
                  class="btn-common-spec"
                  data-action="apply-common-profile"
                  aria-label="Apply common profile preset for profile ${p+1}"
                >
                  Common: 1.5B20G60 GR50
                </button>
                <button type="button" class="btn-remove-row" aria-label="Remove profile ${p+1}">Remove</button>
              </div>
            </div>

            <div class="deck-spec-grid">
              <div class="field-group">
                <label>Depth</label>
                <select class="${Rt(d,"depth")?"required-missing":""}" data-group="specs" data-field="depth">${J([{value:"",label:""},...q.depth],d.specs.depth)}</select>
              </div>
              <div class="field-group">
                <label>Profile</label>
                <select class="${Rt(d,"profile")?"required-missing":""}" data-group="specs" data-field="profile">${J([{value:"",label:""},...q.profile],d.specs.profile)}</select>
              </div>
              <div class="field-group">
                <label>Gage</label>
                <select class="${Rt(d,"gage")?"required-missing":""}" data-group="specs" data-field="gage">${J([{value:"",label:""},...q.gage],d.specs.gage)}</select>
              </div>
              <div class="field-group">
                <label>Finish</label>
                <select class="${Rt(d,"finish")?"required-missing":""}" data-group="specs" data-field="finish">${J([{value:"",label:""},...q.finish],d.specs.finish)}</select>
              </div>
              <div class="field-group">
                <label>Paint Top</label>
                <select data-group="specs" data-field="paintTop">${J([{value:"",label:""},...q.paintTop],d.specs.paintTop)}</select>
              </div>
              <div class="field-group">
                <label>Paint Bottom</label>
                <select data-group="specs" data-field="paintBottom">${J([{value:"",label:""},...q.paintBottom],d.specs.paintBottom)}</select>
              </div>
              <div class="field-group">
                <label>Grade</label>
                <select class="${Rt(d,"grade")?"required-missing":""}" data-group="specs" data-field="grade">${J([{value:"",label:""},...q.grade],d.specs.grade)}</select>
              </div>
              <div class="field-group">
                <label>Manufacturer</label>
                <select class="${Rt(d,"manufacturer")?"required-missing":""}" data-group="specs" data-field="manufacturer">${J([{value:"",label:""},...q.manufacturer],d.specs.manufacturer)}</select>
              </div>
            </div>

            <div class="deck-method-grid">
              <div class="field-group">
                <label>Measurement Method</label>
                <select data-group="row" data-field="method">${J(co,d.method)}</select>
              </div>
            </div>

            ${Qo(d)}

            ${m?`<div class="deck-row-inputs-grid">
              <div class="field-group">
                <label>Override Tons</label>
                <input class="required-missing" type="number" min="0" step="any" inputmode="decimal" data-group="row" data-field="overrideTons" value="${d.overrideTons}" required />
                ${d.showWeightWarning?`<p class="help-text">${d.missingLookupMessage}</p>`:""}
              </div>
            </div>`:""}
          
            <div class="deck-row-outputs">
              <div class="field-group">
                <label>Total Profile SQS</label>
                <input type="text" class="row-sqs-output" readonly value="${G(d.rowSqs)}" />
              </div>
              <div class="field-group">
                <label>Total Profile Tons</label>
                <input type="text" class="row-tons-output" readonly value="${G(d.rowTons)}" />
              </div>
            </div>
          </div>
        `;return`
        <div class="deck-row" data-row-id="${d.id}">
          <div class="deck-summary-row" data-id="p_${d.id}" role="button" tabindex="0" aria-expanded="${!d.isCollapsed}">
            <span class="deck-summary-toggle" aria-hidden="true">${u}</span>
            <span class="deck-summary-name">${Fe(d)}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-supplier">${U(d.specs.manufacturer||"—")}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-sqs">SQS: ${G(d.rowSqs)}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-tons">TONS: ${G(d.rowTons)}</span>
          </div>

          ${f}
        </div>
      `}).join("");It.innerHTML=`${s}${l}${c}${o}${r}`}function Ei(t,e,n){const s=t.subsections[e],o=t.values[e],a=s.isCollapsed?"+":"−",r=s.isEditing?"":"disabled",c=s.isEditing?"SAVE":"EDIT",l=s.isEditing?"":"disabled",d=(o.buckets||[]).map((m,f)=>{const k=v(m.start),S=v(m.end),T=v(m.cost);return`
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
          value="${S}"
          ${r}
        />
        <input
          type="text"
          inputmode="decimal"
          data-csc-field="bucket-cost"
          data-csc-subsection="${e}"
          data-csc-row="${f}"
          value="${s.isEditing?String(T):M(T)}"
          ${r}
        />
      </div>
    `}).join(""),p=e==="joists"?`
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
      `:"",u=s.isCollapsed?"":`
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="csc-toggle-edit" data-csc-subsection="${e}">
            ${c}
          </button>
          <button type="button" class="btn-secondary" data-action="csc-add-row" data-csc-subsection="${e}" ${l}>
            + Add Row
          </button>
        </div>
        <div class="csc-bucket-grid">
          <div class="csc-bucket-header">
            <span>Start</span>
            <span>End</span>
            <span>Cost / Ton</span>
          </div>
          ${d}
        </div>
        ${p}
      </div>
    `;return`
    <section class="admin-section csc-subsection" data-csc-subsection="${e}">
      <div class="admin-summary-row" data-action="csc-toggle-sub" data-csc-subsection="${e}" role="button" tabindex="0" aria-expanded="${!s.isCollapsed}">
        <span class="admin-summary-toggle" aria-hidden="true">${a}</span>
        <span class="admin-summary-name">${n}</span>
      </div>
      ${u}
    </section>
  `}function un(t,e,n,s="LEAD TIMES"){const o=String(t||"").trim().toLowerCase(),a=e.isCollapsed?"+":"−",r=e.isEditing?"":"disabled",c=e.isEditing?"SAVE":"EDIT",d=(o==="trojan"?[{key:"submittalsDeckOnly",label:"Submittals (Deck Only)"},{key:"submittalsJoistsUnder50",label:"Submittals (Joists < 50T)"},{key:"submittalsDeckAndJoistsOver50",label:"Submittals (Deck+Joists >= 50T)"},{key:"fabrication",label:"Fabrication"}]:[{key:"fabrication",label:"Fabrication"}]).map(m=>{var S,T;const f=w((S=n==null?void 0:n[m.key])==null?void 0:S.min),k=w((T=n==null?void 0:n[m.key])==null?void 0:T.max);return`
        <div class="csc-bucket-row">
          <span>${m.label}</span>
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            data-leadtime-supplier="${o}"
            data-leadtime-path="${m.key}"
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
            data-leadtime-path="${m.key}"
            data-leadtime-bound="max"
            value="${k===""?"":k}"
            ${r}
          />
        </div>
      `}).join(""),p=e.error?`<p class="help-text">${U(e.error)}</p>`:"",u=e.isCollapsed?"":`
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
          ${d}
        </div>
        ${p}
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
      ${u}
    </section>
  `}function Xo(t,e,n){const s=lt(t.values);t.values=s;const o=t.isCollapsed?"+":"−",a=t.isEditing?"":"disabled",r=t.isEditing?"SAVE":"EDIT",c=t.isEditing?"":"disabled",l=(s.buckets||[]).map((p,u)=>{const m=v(p.start),f=v(p.end),k=String(p.scopeType||"DECK+JOISTS").toUpperCase(),S=Number.parseInt(String(p.tier||2),10),T=v(p.detailingPercent);return`
      <div class="detailing-bucket-row">
        <input
          type="text"
          inputmode="decimal"
          data-detailing-field="bucket-start"
          data-detailing-row="${u}"
          value="${m}"
          ${a}
        />
        <input
          type="text"
          inputmode="decimal"
          data-detailing-field="bucket-end"
          data-detailing-row="${u}"
          value="${f}"
          ${a}
        />
        <select
          data-detailing-field="scope-type"
          data-detailing-row="${u}"
          ${a}
        >
          ${Pe.map(E=>`<option value="${E}" ${E===k?"selected":""}>${E}</option>`).join("")}
        </select>
        <select
          data-detailing-field="tier"
          data-detailing-row="${u}"
          ${a}
        >
          ${De.map(E=>`<option value="${E}" ${E===S?"selected":""}>${E}</option>`).join("")}
        </select>
        <input
          type="text"
          inputmode="decimal"
          data-detailing-field="detailing-percent"
          data-detailing-row="${u}"
          value="${t.isEditing?String(T):G(T)}"
          ${a}
        />
      </div>
    `}).join(""),d=t.isCollapsed?"":`
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
          ${l}
        </div>
        <p class="help-text">Minimum detailing fee applied automatically: ${y(Math.max(500,v(s.minimumFee)))}</p>
      </div>
    `;return`
    <section class="admin-section" data-admin-section="${e}">
      <div class="admin-summary-row" data-admin-id="${e}" role="button" tabindex="0" aria-expanded="${!t.isCollapsed}">
        <span class="admin-summary-toggle" aria-hidden="true">${o}</span>
        <span class="admin-summary-name">${n}</span>
      </div>
      ${d}
    </section>
  `}function Tt(t,e,n){const s=t.subsections[e],o=s.isCollapsed?"+":"−",a=s.isEditing?"":"disabled",r=s.isEditing?"SAVE":"EDIT";if(e==="conditions"){const u=Array.isArray(t.values.documentConditions)?t.values.documentConditions:[],m=s.isEditing?"":"disabled",f=u.length>0?u.map((S,T)=>`
        <div class="trojan-conditions-row" data-trojan-condition-row="${S.id}">
          <select data-trojan-condition-field="slot" data-trojan-condition-id="${S.id}" ${a}>
            ${Oi.map(E=>`<option value="${E.value}" ${E.value===S.slot?"selected":""}>${E.label}</option>`).join("")}
          </select>
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            data-trojan-condition-field="after-number"
            data-trojan-condition-id="${S.id}"
            value="${Number.isFinite(Number(S.afterNumber))?Number(S.afterNumber):0}"
            ${a}
            title="Insert after numbered item"
          />
          <textarea
            rows="3"
            data-trojan-condition-field="text"
            data-trojan-condition-id="${S.id}"
            ${a}
          >${U(S.text||"")}</textarea>
          <button
            type="button"
            class="btn-secondary"
            data-action="trojan-remove-condition-row"
            data-trojan-condition-id="${S.id}"
            ${m}
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
          <button type="button" class="btn-secondary" data-action="trojan-add-condition-row" data-trojan-subsection="${e}" ${m}>
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
    `}if(e==="leadTimes")return un("trojan",s,t.values.leadTimes,n);const d=(ji[e]||[]).map(u=>mt.trojan.fields.find(m=>m.key===u)).filter(Boolean).map(u=>{const m=t.values[u.key],f=u.type==="text"?String(m||""):s.isEditing?m===""?"":String(v(m)):M(m,{blankAsEmpty:!0});return`
        <div class="field-group">
          <label>${u.label}</label>
          <input
            type="text"
            inputmode="${u.type==="text"?"text":"decimal"}"
            data-admin-field="${u.key}"
            data-admin-type="${u.type||"currency"}"
            autocomplete="${u.type==="text"?"street-address":"off"}"
            value="${f}"
            ${a}
          />
        </div>
      `}).join(""),p=s.isCollapsed?"":`
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="trojan-toggle-edit" data-trojan-subsection="${e}">
            ${r}
          </button>
        </div>
        ${d}
      </div>
    `;return`
    <section class="admin-section csc-subsection" data-trojan-subsection="${e}">
      <div class="admin-summary-row" data-action="trojan-toggle-sub" data-trojan-subsection="${e}" role="button" tabindex="0" aria-expanded="${!s.isCollapsed}">
        <span class="admin-summary-toggle" aria-hidden="true">${o}</span>
        <span class="admin-summary-name">${n}</span>
      </div>
      ${p}
    </section>
  `}function D(){const t=Object.keys(mt).map(e=>{const n=mt[e],s=i.admin.sections[e],o=s.isCollapsed?"+":"−";if(e==="trojan"){const c=s.isCollapsed?"":`
            <div class="admin-section-content" data-admin-content="${e}">
              <div class="csc-subsections">
                ${Tt(s,"inbound","INBOUND")}
                ${Tt(s,"mfg","MFG")}
                ${Tt(s,"outbound","OUTBOUND")}
                ${Tt(s,"accessories","ACCESSORIES")}
                ${Tt(s,"leadTimes","LEAD TIMES")}
                ${Tt(s,"margins","MARGINS")}
                ${Tt(s,"conditions","CONDITIONS")}
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
                ${Ei(s,"joists","JOISTS")}
                ${Ei(s,"deck","DECK")}
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
        `}if(e==="detailing")return Xo(s,e,n.label);if(e==="cano"){const c=s.isCollapsed?"":`
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
        `}const a=n.fields.map(c=>{const l=s.values[c.key],d=c.type==="text"?String(l||""):s.isEditing?l===""?"":String(v(l)):M(l,{blankAsEmpty:!0}),p=s.isEditing?"":"disabled";return`
            <div class="field-group">
              <label>${c.label}</label>
              <input
                type="text"
                inputmode="${c.type==="text"?"text":"decimal"}"
                data-admin-field="${c.key}"
                data-admin-type="${c.type||"currency"}"
                autocomplete="${c.type==="text"?"street-address":"off"}"
                value="${d}"
                ${p}
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
      `}).join("");st.innerHTML=t,$o()}function Zo(){if(i.admin.changelog.length===0){xn.innerHTML='<p class="help-text">No changelog entries yet.</p>';return}const t=[...i.admin.changelog].sort((e,n)=>n.timestamp-e.timestamp).map(e=>`
      <div class="admin-changelog-entry">
        <div class="admin-changelog-line">${fo(e.timestamp)}</div>
        <div class="admin-changelog-line">${e.section} | ${e.metric}</div>
        <div class="admin-changelog-line">${typeof e.from=="string"||typeof e.to=="string"?`${String(e.from||"")} → ${String(e.to||"")}`:`${M(e.from)} → ${M(e.to)}`}</div>
      </div>
    `).join("");xn.innerHTML=t}function ta(t){const e=st.querySelector(`[data-admin-section="${t}"]`);if(!e)return;const n=i.admin.sections[t],s=mt[t],o={...n.values};s.fields.forEach(a=>{const r=e.querySelector(`[data-admin-field="${a.key}"]`);if(!r)return;const c=a.type==="text"?String(r.value||"").trim():v(r.value);n.values[a.key]=c}),s.fields.forEach(a=>{const r=a.type==="text"?String(o[a.key]||"").trim():v(o[a.key]),c=a.type==="text"?String(n.values[a.key]||"").trim():v(n.values[a.key]);r!==c&&i.admin.changelog.push({timestamp:Date.now(),section:s.label,metric:a.label,from:r,to:c})}),n.isEditing=!1,Ht(),D(),t==="trojan"&&pe()}function ea(t){const e=st.querySelector('[data-admin-section="csc"]');if(!e)return;const n=i.admin.sections.csc,s=n.values[t];if(s){if((s.buckets||[]).forEach((o,a)=>{const r=e.querySelector(`[data-csc-field="bucket-start"][data-csc-subsection="${t}"][data-csc-row="${a}"]`),c=e.querySelector(`[data-csc-field="bucket-end"][data-csc-subsection="${t}"][data-csc-row="${a}"]`),l=e.querySelector(`[data-csc-field="bucket-cost"][data-csc-subsection="${t}"][data-csc-row="${a}"]`);s.buckets[a]={start:v(r==null?void 0:r.value),end:v(c==null?void 0:c.value),cost:v(l==null?void 0:l.value)}}),t==="joists"){const o=e.querySelector('[data-csc-field="extra-shipping-0-9"][data-csc-subsection="joists"]');o&&(s.extraShippingFee_0_9=v(o.value))}n.subsections[t].isEditing=!1,Ht(),D(),O()}}function na(t){var c,l;const e=i.admin.sections.csc,n=(c=e.subsections)==null?void 0:c[t],s=(l=e.values)==null?void 0:l[t];if(!n||!s||!Array.isArray(s.buckets)||!n.isEditing)return;const o=s.buckets[s.buckets.length-1],a=o?v(o.end):0,r=s.buckets.length>0?a+1:0;s.buckets.push({start:r,end:r,cost:0}),D()}function ia(){const t=st.querySelector('[data-admin-section="detailing"]');if(!t)return;const e=i.admin.sections.detailing,n=lt(e.values);n.buckets=(n.buckets||[]).map((s,o)=>{const a=t.querySelector(`[data-detailing-field="bucket-start"][data-detailing-row="${o}"]`),r=t.querySelector(`[data-detailing-field="bucket-end"][data-detailing-row="${o}"]`),c=t.querySelector(`[data-detailing-field="scope-type"][data-detailing-row="${o}"]`),l=t.querySelector(`[data-detailing-field="tier"][data-detailing-row="${o}"]`),d=t.querySelector(`[data-detailing-field="detailing-percent"][data-detailing-row="${o}"]`);return{start:v(a==null?void 0:a.value),end:v(r==null?void 0:r.value),scopeType:Pe.includes(String((c==null?void 0:c.value)||"").toUpperCase())?String(c.value).toUpperCase():"DECK+JOISTS",tier:De.includes(Number.parseInt(String((l==null?void 0:l.value)||""),10))?Number.parseInt(String(l.value),10):2,detailingPercent:v(d==null?void 0:d.value)}}),e.values=lt(n),e.isEditing=!1,Ht(),D(),O()}function sa(){const t=i.admin.sections.detailing;if(!t.isEditing)return;const e=lt(t.values),n=e.buckets[e.buckets.length-1],s=n?v(n.end):0,o=e.buckets.length>0?s+1:0;e.buckets.push({start:o,end:o,scopeType:"DECK+JOISTS",tier:2,detailingPercent:4}),t.values=e,D()}function oa(){var n;const t=i.admin.sections.trojan,e=(n=t.subsections)==null?void 0:n.conditions;!e||!e.isEditing||(Array.isArray(t.values.documentConditions)||(t.values.documentConditions=[]),t.values.documentConditions.push({id:he,slot:"GENERAL_SALE_TERMS_CONTINUED",afterNumber:0,text:""}),he+=1,D())}function aa(t){var r;const e=st.querySelector('[data-admin-section="trojan"]');if(!e)return;const n=i.admin.sections.trojan,s=(r=n.subsections)==null?void 0:r[t];if(!s)return;if(t==="conditions"){const l=Array.from(e.querySelectorAll("[data-trojan-condition-row]")).map(d=>{const p=Number.parseInt(String(d.getAttribute("data-trojan-condition-row")||""),10),u=d.querySelector('[data-trojan-condition-field="slot"]'),m=d.querySelector('[data-trojan-condition-field="after-number"]'),f=d.querySelector('[data-trojan-condition-field="text"]'),k=String((u==null?void 0:u.value)||"").trim().toUpperCase(),S=Ii.includes(k)?k:"GENERAL_SALE_TERMS_CONTINUED",T=Number.parseInt(String((m==null?void 0:m.value)??""),10),E=String((f==null?void 0:f.value)||"").trim();return{id:Number.isFinite(p)&&p>0?p:he++,slot:S,afterNumber:Number.isFinite(T)&&T>=0?T:0,text:E}}).filter(d=>d.text!=="");n.values.documentConditions=l,s.isEditing=!1,Ht(),D();return}const o=ji[t]||[],a={...n.values};o.forEach(c=>{const l=mt.trojan.fields.find(f=>f.key===c);if(!l)return;const d=e.querySelector(`[data-admin-field="${c}"]`);if(!d)return;const p=l.type==="text"?String(d.value||"").trim():v(d.value);n.values[c]=p;const u=l.type==="text"?String(a[c]||"").trim():v(a[c]),m=l.type==="text"?String(p||"").trim():v(p);u!==m&&i.admin.changelog.push({timestamp:Date.now(),section:"TROJAN",metric:l.label,from:u,to:m})}),s.isEditing=!1,Ht(),D(),t==="outbound"&&pe(),O()}function $e(t){var a,r;const e=String(t||"").trim().toLowerCase();if(!["trojan","csc","cano"].includes(e))return null;const n=i.admin.sections[e],s=(a=n==null?void 0:n.subsections)==null?void 0:a.leadTimes,o=(r=n==null?void 0:n.values)==null?void 0:r.leadTimes;return!n||!s||!o?null:{section:n,subsection:s,values:o,normalized:e}}function ra(t){const e=$e(t);if(!e)return;const{subsection:n,values:s,normalized:o}=e,a=st.querySelector(`[data-admin-section="${o}"]`);if(!a)return;const r=o==="trojan"?["submittalsDeckOnly","submittalsJoistsUnder50","submittalsDeckAndJoistsOver50","fabrication"]:["fabrication"],c=JSON.parse(JSON.stringify(s));for(const l of r){const d=a.querySelector(`[data-leadtime-supplier="${o}"][data-leadtime-path="${l}"][data-leadtime-bound="min"]`),p=a.querySelector(`[data-leadtime-supplier="${o}"][data-leadtime-path="${l}"][data-leadtime-bound="max"]`),u=String((d==null?void 0:d.value)??"").trim(),m=String((p==null?void 0:p.value)??"").trim(),f=w(u),k=w(m);if(u!==""&&f===""||m!==""&&k===""){n.error=`${l[0].toUpperCase()}${l.slice(1)} lead times must be non-negative integers.`,D();return}if(f!==""&&k!==""&&f>k){n.error=`${l[0].toUpperCase()}${l.slice(1)} Min must be less than or equal to Max.`,D();return}c[l]={min:f,max:k}}n.error="",n.isEditing=!1,e.section.values.leadTimes=c,Ht(),D(),O()}function ca(){const{totalSqs:t,totalTons:e}=Yo();i.deckProfiles.forEach(n=>{const s=It.querySelector(`[data-row-id="${n.id}"]`);if(!s)return;const o=s.querySelector(".deck-summary-sqs"),a=s.querySelector(".deck-summary-tons"),r=s.querySelector(".row-sqs-output"),c=s.querySelector(".row-tons-output");o&&(o.textContent=`SQS: ${G(n.rowSqs)}`),a&&(a.textContent=`TONS: ${G(n.rowTons)}`),r&&(r.value=G(n.rowSqs)),c&&(c.value=G(n.rowTons))}),i.totals.totalDeckSqs=t,i.totals.totalDeckTons=e,i.totals.deckTotal=0,eo.value=G(i.totals.totalDeckSqs),_i.value=y(i.totals.deckTotal),no.value=G(i.totals.totalDeckTons),Js.classList.add("hidden")}function la(){const t=i.joists.tons.trim();if(t==="")return 0;const e=Number(t);if(Number.isNaN(e)||e<0)return 0;const n=hn(i.joists.supplier);if(n.pricingSupplier==="CSC"){const s=Do(e);if(!s||s.cost<=0)return 0;const o=e<=9?v(i.admin.sections.csc.values.joists.extraShippingFee_0_9):0;return e*s.cost+o}if(n.pricingSupplier==="CANO"){const s=v(i.admin.sections.cano.values.perLb);return s<=0?0:e*Ds.CANO.poundsPerTon*s}return 0}function da(){const t=i.deckProfiles.reduce((c,l)=>dt(l.specs.manufacturer)!=="TROJAN"?c:c+(Number.isFinite(l.rowTons)?l.rowTons:0),0),e=v(i.admin.sections.trojan.values.outboundFreightPerMi),n=g(i.milesFromTrojanFacility);if(t<=0||e<=0||n<=0)return{cost:0,trucks:0,miles:n,rate:e,totalTrojanDeckTons:t};const s=t*2e3,a=Math.ceil(s/48e3);return{cost:a*n*e,trucks:a,miles:n,rate:e,totalTrojanDeckTons:t}}function ua(){Fn&&(Fn.value=y(i.totals.joistsTotal)),Jn&&(Jn.value=G(i.totals.totalDeckSqs)),_n&&(_n.value=y(i.totals.deckTotal)),Vn&&(Vn.value=G(i.totals.totalDeckTons)),zn&&(zn.textContent=y(i.totals.trojanShipping)),Hn&&(Hn.textContent=`TRUCKS: ${i.totals.trojanShippingTrucks||0} | MILES: ${G(i.totals.trojanShippingMiles||0)} | RATE: ${M(i.totals.trojanShippingRate||0)}/MI`);const t=i.totals.trojanShipping>0&&(i.totals.trojanShippingTrucks||0)>0&&(i.totals.trojanShippingMiles||0)>0&&(i.totals.trojanShippingRate||0)>0;qn&&qn.classList.toggle("hidden",!t),Kn&&(Kn.value=y(i.totals.grandTotal));const e=g(i.totals.trojanDeckTons),n=g(i.totals.brokeredDeckTons),s=g(i.joists.tons);if(ri){const o=e+n+s;ri.textContent=G(o)}}function pa(t=null){const e=t||Qt();return e.hasTrojanDeck?`
    <div class="pricing-cogs-grid">
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Coil Cost</span><strong>${y(e.coilCost)}</strong></div>
        <p class="pricing-cogs-meta">${Y(e.lbs)} LB x ${M(v(i.admin.sections.trojan.values.coilCostPerLb))}/LB</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Inbound Freight</span><strong>${y(e.inboundCost)}</strong></div>
        <p class="pricing-cogs-meta">${Y(e.lbs)} LB x ${M(v(i.admin.sections.trojan.values.inboundFreightPerLb))}/LB</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Labor</span><strong>${y(e.laborCost)}</strong></div>
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
        <div class="pricing-cogs-row"><span>Outbound Freight</span><strong>${y(e.outboundCost)}</strong></div>
        <p class="pricing-cogs-meta">${Y(e.trucks)} trucks x ${G(e.miles)} miles x ${M(v(i.admin.sections.trojan.values.outboundFreightPerMi))}/MI</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Total COGS</span><strong>${y(e.totalCogs)}</strong></div>
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
        <div class="pricing-cogs-row"><span>Margin Amount</span><strong>${y(e.marginAmount)}</strong></div>
        <p class="pricing-cogs-meta">${y(e.totalCogs)} x ${G(e.marginPercent)}% (minimum ${y(e.minimumMarginAmount)})</p>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Retail Trojan Deck Price</span><strong>${y(e.totalWithMargin)}</strong></div>
      </div>
    </div>
  `:'<p class="help-text">No Trojan deck tons in scope.</p>'}function Qt(t=null){const e=i.admin.sections.trojan.values,n=g(t===null?i.totals.trojanDeckTons:t),s=n*2e3,o=v(e.coilCostPerLb),a=v(e.inboundFreightPerLb),r=v(e.laborPerLb),c=v(e.outboundFreightPerMi),l=g(i.milesFromTrojanFacility),d=n>0?Math.ceil(s/48e3):0,p=s*o,u=s*a,m=s*r,f=d*l*c,k=p+u+m+f,S=vn(),T=tt(k,"trojanDeck"),E=T.marginAmount,C=k+E;return{hasTrojanDeck:n>0,trojanDeckTons:n,lbs:s,trucks:d,miles:l,coilCost:p,inboundCost:u,laborCost:m,outboundCost:f,totalCogs:k,marginPercent:T.marginPercent,minimumMarginAmount:S,marginAmount:E,totalWithMargin:C}}function ge(){const t=i.admin.sections.trojan.values,e=v(t.accessoriesCostPerScrew),n=v(t.accessoriesCostPerTon),s=(i.accessories||[]).reduce((l,d)=>{if(!Le(d.type))return l;const p=Number.isFinite(d.screwCount)?d.screwCount:0;return l+Math.max(0,p)},0),o=(i.accessories||[]).reduce((l,d)=>je(d.type)?l+g(d.tons):l,0),a=s*e,r=o*n,c=a+r;return{hasAccessories:s>0||o>0,totalScrewCount:s,totalAccessoryTons:o,costPerScrew:e,costPerTon:n,screwCost:a,tonnageCost:r,totalCogs:c}}function ma(){const t=ge();if(!t.hasAccessories)return'<p class="help-text">No accessories in scope.</p>';const e=t.totalScrewCount>0?`
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Screw Count Cost</span><strong>${y(t.screwCost)}</strong></div>
        <p class="pricing-cogs-meta">${Y(t.totalScrewCount)} screws x ${M(t.costPerScrew)} each</p>
      </div>
    `:"",n=t.totalAccessoryTons>0?`
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Accessories Tonnage Cost</span><strong>${y(t.tonnageCost)}</strong></div>
        <p class="pricing-cogs-meta">${G(t.totalAccessoryTons)} tons x ${M(t.costPerTon)}/TON</p>
      </div>
    `:"";return`
    <div class="pricing-cogs-grid">
      ${e}
      ${n}
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Total Accessories COGS Delivered</span><strong>${y(t.totalCogs)}</strong></div>
      </div>
    </div>
  `}function Je(){const t=g(i.joists.tons),e=hn(i.joists.supplier),n=e.pricingSupplier;if(t<=0||n==="")return{hasJoists:!1,vendor:n,supplier:n,tons:0,lbs:0,baseCost:0,surcharge:0,subtotalCost:0,marginPercent:$t("joists"),marginAmount:0,totalCost:0,detail:"",errorMessage:""};if(n==="CANO"){const o=v(i.admin.sections.cano.values.perLb);if(i.admin.sections.cano.values.perLb,o<=0){const l=tt(0,"joists");return{hasJoists:!0,vendor:n,supplier:n,tons:t,lbs:t*2e3,baseCost:0,surcharge:0,subtotalCost:0,marginPercent:l.marginPercent,marginAmount:l.marginAmount,totalCost:0,detail:"",errorMessage:"Missing required pricing for CANO: perLb ($/LB)."}}const a=t*2e3,r=a*o,c=tt(r,"joists");return{hasJoists:!0,vendor:n,supplier:n,tons:t,lbs:a,baseCost:r,surcharge:0,subtotalCost:r,marginPercent:c.marginPercent,marginAmount:c.marginAmount,totalCost:c.totalWithMargin,detail:`${Y(a)} LB x ${M(o)}/LB`,errorMessage:""}}if(n==="CSC"){const o=me({vendor:"CSC",scope:"JOISTS",tons:t}),a=o.pricePerTon;if(o.bucketStart,o.bucketEnd,i.admin.sections.csc.values.joists.extraShippingFee_0_9,a<=0){const p=tt(0,"joists");return{hasJoists:!0,vendor:n,supplier:n,tons:t,lbs:t*2e3,baseCost:0,surcharge:0,subtotalCost:0,marginPercent:p.marginPercent,marginAmount:p.marginAmount,totalCost:0,detail:"",errorMessage:"Missing required pricing for CSC: JOISTS bucket cost for selected tonnage."}}const r=t*a,c=o.bucketStart===0&&o.bucketEnd===9?v(i.admin.sections.csc.values.joists.extraShippingFee_0_9):0,l=r+c,d=tt(l,"joists");return{hasJoists:!0,vendor:n,supplier:n,tons:t,lbs:t*2e3,baseCost:r,surcharge:c,subtotalCost:l,marginPercent:d.marginPercent,marginAmount:d.marginAmount,totalCost:d.totalWithMargin,detail:`${G(t)} TONS x ${M(a)}/TON`,errorMessage:""}}const s=tt(0,"joists");return{hasJoists:!0,vendor:n,supplier:n,tons:t,lbs:t*2e3,baseCost:0,surcharge:0,subtotalCost:0,marginPercent:s.marginPercent,marginAmount:s.marginAmount,totalCost:0,detail:"",errorMessage:`No joist pricing configured for supplier "${e.selectedRaw||n}".`}}function Ss(t,e,n){const s=[];t!=null&&t.hasTrojanDeck&&s.push({supplier:"TROJAN",subtotalCost:g(t.totalCogs),marginAmount:g(t.marginAmount),locked:!!i.pricingMarginOverrides.trojanDeck,sync:o=>{t.marginAmount=o,t.marginPercent=t.totalCogs>0?o/t.totalCogs*100:t.marginPercent,t.totalWithMargin=t.totalCogs+o}}),((e==null?void 0:e.entries)||[]).forEach(o=>{s.push({supplier:String(o.vendor||"").trim().toUpperCase(),subtotalCost:g(o.cost),marginAmount:g(o.marginAmount),locked:!!i.pricingMarginOverrides.brokeredDeck,sync:a=>{o.marginAmount=a,o.marginPercent=o.cost>0?a/o.cost*100:o.marginPercent,o.totalCost=o.cost+a}})}),n!=null&&n.hasJoists&&s.push({supplier:String(n.vendor||"").trim().toUpperCase(),subtotalCost:g(n.subtotalCost),marginAmount:g(n.marginAmount),locked:!!i.pricingMarginOverrides.joists,sync:o=>{n.marginAmount=o,n.marginPercent=n.subtotalCost>0?o/n.subtotalCost*100:n.marginPercent,n.totalCost=n.subtotalCost+o}}),qi(s,vn()),e&&(e.marginAmount=(e.entries||[]).reduce((o,a)=>o+g(a.marginAmount),0),e.marginPercent=e.subtotalCost>0?e.marginAmount/e.subtotalCost*100:0,e.totalCost=e.subtotalCost+e.marginAmount)}function ga(t=null){const e=t||Je();if(!e.hasJoists)return'<p class="help-text">No joists in scope.</p>';const n=e.detail?`<p class="pricing-cogs-meta">${e.detail}</p>`:"",s=e.errorMessage?`<p class="help-text">${U(e.errorMessage)}</p>`:"",o=e.surcharge>0?`
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>CSC Surcharge (&lt;10 Tons)</span><strong>${y(e.surcharge)}</strong></div>
      </div>
    `:"";return`
    <div class="pricing-cogs-grid">
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>${e.supplier} Joist Cost</span><strong>${y(e.baseCost)}</strong></div>
        ${n}
        ${s}
      </div>
      ${o}
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
        <div class="pricing-cogs-row"><span>Margin Amount</span><strong>${y(e.marginAmount)}</strong></div>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Total Joist Cost</span><strong>${y(e.totalCost)}</strong></div>
      </div>
    </div>
  `}function fa(t,e){const n=g(t)>0,s=g(e)>0;return n&&s?"DECK+JOISTS":n?"DECK_ONLY":s?"JOIST_ONLY":""}function ba(t,e,n){const s=lt(i.admin.sections.detailing.values),o=An(t),a=Number.parseInt(String(n),10),r=s.buckets||[],c=r.find(m=>m.scopeType===e&&m.tier===a&&o>=v(m.start)&&o<=v(m.end));if(c)return{...c,bucketTons:o};const l=r.filter(m=>m.scopeType===e&&m.tier===a),d=l.sort((m,f)=>v(m.end)-v(f.end))[l.length-1];if(d)return{...d,bucketTons:o};const p=r.filter(m=>m.scopeType===e),u=p.sort((m,f)=>v(m.end)-v(f.end))[p.length-1];return u?{...u,bucketTons:o}:null}function Gn(t,e,n){const s=g(t),o=g(e),a=g(n),r=o+a,c=fa(o,a),l=Number.parseInt(String(i.projectComplexityTier||"2"),10)||2,d=lt(i.admin.sections.detailing.values),p=Math.max(500,v(d.minimumFee)),u=c?ba(r,c,l):null,m=u?v(u.detailingPercent):0,f=i.pricingDetailing.detailingPercentOverride===null||i.pricingDetailing.detailingPercentOverride===void 0?null:g(i.pricingDetailing.detailingPercentOverride),k=f!==null?f:m,S=f!==null&&k===0,T=s>0?S?0:Math.max(s*(k/100),p):0,E=s+T;return i.pricingDetailing.detailingPercentAuto=m,i.pricingDetailing.detailingAmount=T,i.pricingDetailing.subtotal=s,i.pricingDetailing.finalTotal=E,{subtotal:s,deckTons:o,joistTons:a,totalTons:r,scopeType:c,tier:l,minimumFee:p,matchedBucket:u,autoPercent:m,overridePercent:f,appliedPercent:k,detailingAmount:T,finalTotal:E}}function ka(t){if(!t||t.subtotal<=0)return'<p class="help-text">No pricing subtotal in scope.</p>';const e=t.overridePercent!==null?`
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
        <div class="pricing-cogs-row"><span>Minimum Detailing Fee</span><strong>${y(t.minimumFee)}</strong></div>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Detailing Cost</span><strong>${y(t.detailingAmount)}</strong></div>
      </div>
    </div>
  `}function _e(){var p;const t=u=>Math.round(g(u)*100)/100,e=(((p=i.vendorPlan)==null?void 0:p.deckAssignments)||[]).filter(u=>u.vendor!=="TROJAN"&&u.tons>0),n=ut(),s=new Map;e.forEach(u=>{const m=String(u.vendor||"").trim().toUpperCase();s.has(m)||s.set(m,{vendor:m,tons:0,lbs:0,cost:0,pricingMode:"none",detail:"",errorMessage:""});const f=s.get(m);f.tons+=g(u.tons)});const o=Array.from(s.values()).map(u=>{const f=hn(u.vendor).pricingSupplier;if(u.tons=t(u.tons),u.lbs=u.tons*2e3,f==="CANO"){const S=v(i.admin.sections.cano.values.perLb);return u.cost=S>0?u.lbs*S:0,u.pricingMode="cano",u.detail=`${Y(u.lbs)} LB x ${M(S)}/LB`,S<=0&&(u.errorMessage="Missing required pricing for CANO: perLb ($/LB)."),u}const k=vt(f,u.tons,n);return k>0?(u.cost=u.tons*k,u.pricingMode=f==="CSC"?"csc":"factor",u.detail=`${G(u.tons)} TONS x ${M(k)}/TON`,u):(u.cost=0,u.pricingMode="none",u.detail="",u.errorMessage=`No pricing configured for supplier "${u.vendor}".`,u)}),a=o.reduce((u,m)=>u+g(m.cost),0),r=o.reduce((u,m)=>u+g(m.tons),0),c=o.reduce((u,m)=>u+g(m.lbs),0);o.forEach(u=>{const m=tt(u.cost,"brokeredDeck");u.marginPercent=m.marginPercent,u.marginAmount=m.marginAmount,u.totalCost=u.cost+u.marginAmount});const l=o.reduce((u,m)=>u+g(m.marginAmount),0),d=a>0?l/a*100:$t("brokeredDeck");return{hasBrokeredDeck:o.length>0,entries:o,subtotalCost:a,marginPercent:d,marginAmount:l,totalCost:a+l,totalTons:r,totalLbs:c}}function Ca(t=null){const e=t||_e();return e.hasBrokeredDeck?`
    <div class="pricing-cogs-grid">
      ${e.entries.map(s=>`
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>${s.vendor} Deck Cost</span><strong>${y(s.cost)}</strong></div>
        ${s.detail?`<p class="pricing-cogs-meta">${s.detail}</p>`:""}
        ${s.errorMessage?`<p class="help-text">${U(s.errorMessage)}</p>`:""}
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
        <div class="pricing-cogs-row"><span>Margin Amount</span><strong>${y(e.marginAmount)}</strong></div>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Total Supplier Deck Cost</span><strong>${y(e.totalCost)}</strong></div>
      </div>
    </div>
  `:'<p class="help-text">No supplier deck tons in scope.</p>'}function vs(t,e){const n=String(t||"").trim().toUpperCase(),s=Math.round(g(e)*100)/100;if(s<=0||n!=="CSC"&&n!=="CANO")return{vendor:n,tons:0,subtotalCost:0,marginPercent:$t("brokeredDeck"),marginAmount:0,totalCost:0,detail:"No supplier deck tons in scope"};if(n==="CANO"){const l=s*2e3,d=v(i.admin.sections.cano.values.perLb),p=l*d,u=tt(p,"brokeredDeck");return{vendor:n,tons:s,subtotalCost:p,marginPercent:u.marginPercent,marginAmount:u.marginAmount,totalCost:u.totalWithMargin,detail:`${Y(l)} LB x ${M(d)}/LB`}}const a=me({vendor:"CSC",scope:"DECK",tons:s}).pricePerTon,r=s*a,c=tt(r,"brokeredDeck");return{vendor:n,tons:s,subtotalCost:r,marginPercent:c.marginPercent,marginAmount:c.marginAmount,totalCost:c.totalWithMargin,detail:`${G(s)} TONS x ${M(a)}/TON`}}function Es(t,e){const n=String(t||"").trim().toUpperCase(),s=g(e);if(s<=0||n!=="CSC"&&n!=="CANO")return{vendor:n,tons:0,subtotalCost:0,surcharge:0,marginPercent:$t("joists"),marginAmount:0,totalCost:0,detail:"No joist tons in scope"};if(n==="CANO"){const p=s*2e3,u=v(i.admin.sections.cano.values.perLb),m=p*u,f=tt(m,"joists");return{vendor:n,tons:s,subtotalCost:m,surcharge:0,marginPercent:f.marginPercent,marginAmount:f.marginAmount,totalCost:f.totalWithMargin,detail:`${Y(p)} LB x ${M(u)}/LB`}}const o=me({vendor:"CSC",scope:"JOISTS",tons:s}),a=o.pricePerTon,r=s*a,c=o.bucketStart===0&&o.bucketEnd===9?v(i.admin.sections.csc.values.joists.extraShippingFee_0_9):0,l=r+c,d=tt(l,"joists");return{vendor:n,tons:s,subtotalCost:l,surcharge:c,marginPercent:d.marginPercent,marginAmount:d.marginAmount,totalCost:d.totalWithMargin,detail:`${G(s)} TONS x ${M(a)}/TON`}}const Sa=["TROJAN","CANO","CSC","CUTTING EDGE","CORDECK","CSM","HOUSTONBDECK"];function Ts(t,e){return!(!t||e.americanSteelRequired&&!t.americanSteelRequired||e.americanManufacturing&&!t.americanManufacturing||e.sdiManufacturer&&!t.sdiManufacturing)}function va(t,e,n={}){var r,c;if(!t||!e||!Ts(t,n)||String(t.supplier||"").trim().toUpperCase()==="TROJAN"&&!ye(e,n))return!1;const s=Number.parseFloat(String(((r=e.specs)==null?void 0:r.depth)||"").trim());if(!Number.isFinite(s)||!(t.depths||[]).some(l=>Math.abs(l-s)<1e-4))return!1;const a=Kt(String(((c=e.specs)==null?void 0:c.profile)||"").trim());return!a||!t.profileAvailability||!Object.prototype.hasOwnProperty.call(t.profileAvailability,a)?!0:!!t.profileAvailability[a]}function Ea(){const t=new Map;return Pi.forEach(e=>{const n=Yt(e);n.supplier&&t.set(n.supplier,n)}),t}function fe(t=null){const e=Array.isArray(t)?t:ce().map(r=>Yt(r)).filter(r=>r.supplier!==""),n=Ea(),s=e.map(r=>{if(!r||!r.supplier)return null;const c=n.get(r.supplier);return{...r,deck:!!r.deck,joists:!!r.joists,depths:Array.isArray(r.depths)&&r.depths.length>0?r.depths:(c==null?void 0:c.depths)||[],priority:Number.isFinite(r.priority)&&r.priority<Number.MAX_SAFE_INTEGER?r.priority:(c==null?void 0:c.priority)||Number.MAX_SAFE_INTEGER}}).filter(Boolean),o=new Map;s.forEach(r=>{const c=String(r.supplier||"").trim().toUpperCase();c&&(o.has(c)||o.set(c,[]),o.get(c).push(r))}),Sa.forEach(r=>{!o.has(r)&&n.has(r)&&o.set(r,[{...n.get(r)}])});const a=Array.from(o.keys()).sort((r,c)=>{const l=Math.min(...(o.get(r)||[]).map(p=>Number.isFinite(p.priority)?p.priority:Number.MAX_SAFE_INTEGER)),d=Math.min(...(o.get(c)||[]).map(p=>Number.isFinite(p.priority)?p.priority:Number.MAX_SAFE_INTEGER));return l!==d?l-d:r.localeCompare(c)});return{rulesBySupplier:o,vendors:a}}function Ln(t={}){const e=(t.deckLines||[]).filter(r=>g(r.rowTons)>0),n=Math.round(e.reduce((r,c)=>r+g(c.rowTons),0)*100)/100,s=g(t.joistTons),o={...t.flags||{}},a=String(o.specifiedManufacturerName||"").trim().toUpperCase();return{deckLines:e,deckTons:n,joistTons:s,flags:o,specifiedManufacturerName:a,hasDeckScope:n>0,hasJoistScope:s>0}}function Ns(t){const e=fe(t);return e.vendors.filter(n=>(e.rulesBySupplier.get(n)||[]).some(s=>s.deck))}function As(t){const e=fe(t);return e.vendors.filter(n=>(e.rulesBySupplier.get(n)||[]).some(s=>s.joists))}function Ta(t,e,n){const s=String(t||"").trim().toUpperCase(),o=g(e);if(o<=0)return!0;if(s==="TROJAN"){const r=Qt(o);return g(r.totalCogs)>0||g(r.totalWithMargin)>0}if(s==="CSC"||s==="CANO"){const r=vs(s,o);return g(r.subtotalCost)>0||g(r.totalCost)>0}const a=vt(s,o,n);return g(a)>0}function Na(t,e,n,s){const o=String(t||"").trim().toUpperCase(),a=s.rulesBySupplier.get(o)||[];return a.length===0?!1:a.some(r=>r.deck&&va(r,e,n.flags))}function sn(t,e,n,s,o,a=null){if(!Array.isArray(t)||t.length===0)return[];const r=t.reduce((d,p)=>d+g(p.rowTons),0),c=a?new Set(a.map(d=>String(d||"").trim().toUpperCase())):null,l=(o==null?void 0:o.pricedDeckSuppliers)||new Set;return n.vendors.filter(d=>!l.has(d)||c&&!c.has(d)||!t.every(u=>Na(d,u,e,n))?!1:Ta(d,r,s))}function Aa(t,e,n){return(t||[]).map((s,o)=>{var l;const a=g(s.rowTons),r=String(e.get(s.id)||"").trim().toUpperCase(),c=vt(r,a,n);return{lineId:s.id,lineIndex:o,profile:s.profileName||((l=s.specs)==null?void 0:l.profile)||"",sqs:g(s.rowSqs),vendor:r,reason:"Optimization scenario selection",tons:a,pricePerTon:c,extendedTotal:a*c}})}function hs(t,e,n,s){if(!t.hasDeckScope)return[{deckMode:"auto",deckVendor:"",deckAssignments:[],deckBreakdown:null}];const o=t.flags.specifiedManufacturer&&t.specifiedManufacturerName?[t.specifiedManufacturerName]:null,a=t.deckLines,r=a.filter(u=>ye(u,t.flags)),c=a.filter(u=>!ye(u,t.flags)),l=new Map;function d(u){const m=Aa(a,u,n);if(m.some(T=>!T.vendor))return;const f=ja(m);if(!f.entries.length||g(f.totalCost)<=0)return;const k=m.map(T=>`${T.lineId}:${T.vendor}`).sort().join("|");if(l.has(k))return;const S=Array.from(new Set(m.map(T=>T.vendor))).sort();l.set(k,{deckMode:S.length>1?"mix":"single",deckVendor:S.length===1?S[0]:"",deckAssignments:m,deckBreakdown:f})}if(sn(a,t,e,n,s,o).forEach(u=>{const m=new Map(a.map(f=>[f.id,u]));d(m)}),r.length>0&&c.length>0){const u=sn(r,t,e,n,s,o),m=sn(c,t,e,n,s,o);u.forEach(f=>{m.forEach(k=>{const S=new Map;r.forEach(T=>S.set(T.id,f)),c.forEach(T=>S.set(T.id,k)),d(S)})})}return Array.from(l.values())}function ys(t,e,n){if(!t.hasJoistScope)return[""];const s=(n==null?void 0:n.pricedJoistSuppliers)||new Set;return e.vendors.filter(o=>{if(!s.has(o)||!(e.rulesBySupplier.get(o)||[]).some(l=>l.joists&&Ts(l,t.flags)))return!1;const c=Es(o,t.joistTons);return g(c.subtotalCost)>0||g(c.totalCost)>0})}function Gs(t,e,n,s=[]){const o=fe(n),a=ut(),r=jn(a),c=Ln({deckLines:t,joistTons:0,flags:e}),l=new Set((s||[]).map(u=>String(u||"").trim().toUpperCase())),d=hs(c,o,a,r),p=new Set;return d.forEach(u=>{(u.deckAssignments||[]).forEach(m=>{m.vendor&&p.add(String(m.vendor).trim().toUpperCase())})}),Array.from(p.values()).filter(u=>l.size===0||l.has(u))}function Ls(t,e,n=[]){const s=fe(e),o=jn(ut()),a=new Set((n||[]).map(c=>String(c||"").trim().toUpperCase()));return ys(Ln({deckLines:[],joistTons:g(i.joists.tons),flags:t}),s,o).filter(c=>a.size===0||a.has(c))}function ha(t,e,n){const s=[];return((t==null?void 0:t.entries)||[]).filter(a=>g(a.tons)>0).sort((a,r)=>{const c=a.vendor==="TROJAN"?0:1,l=r.vendor==="TROJAN"?0:1;return c!==l?c-l:String(a.vendor||"").localeCompare(String(r.vendor||""))}).forEach(a=>{s.push(`${a.vendor} DECK`)}),n&&e&&s.push(`${e} JOIST`),s.join(" + ")}function ut(){return{trojan:{...i.admin.sections.trojan.values},csc:le(i.admin.sections.csc.values),cano:Re(i.admin.sections.cano.values)}}function js(){return Dt({trojan:i.admin.sections.trojan.values.leadTimes,csc:i.admin.sections.csc.values.leadTimes,cano:i.admin.sections.cano.values.leadTimes})}function ya(t,e){const n=String(e||"").trim().toLowerCase(),s=n!=="joistonly"&&n!=="joist_only",o=n!=="deckonly"&&n!=="deck_only",a=new Set,r=new Set,c=Array.isArray(t==null?void 0:t.deckSuppliers)?t.deckSuppliers:t!=null&&t.deckSupplier?[t.deckSupplier]:[],l=Array.isArray(t==null?void 0:t.joistSuppliers)?t.joistSuppliers:t!=null&&t.joistSupplier?[t.joistSupplier]:[];return s&&c.forEach(d=>{const p=String(d||"").trim().toUpperCase();zt.includes(p)&&a.add(p)}),o&&l.forEach(d=>{const p=String(d||"").trim().toUpperCase();p!=="TROJAN"&&zt.includes(p)&&r.add(p)}),{deckSuppliers:[...a],joistSuppliers:[...r],includeDeck:s,includeJoists:o}}function Os(t,e={}){var r,c,l,d;const n=Dt(t),s=!!e.hasJoistScope,o=g(e.totalTons);let a="submittalsDeckOnly";return s&&(a=o>=50?"submittalsDeckAndJoistsOver50":"submittalsJoistsUnder50"),{min:w((c=(r=n.trojan)==null?void 0:r[a])==null?void 0:c.min),max:w((d=(l=n.trojan)==null?void 0:l[a])==null?void 0:d.max),key:a}}function Is({supplierSelections:t,specType:e,scopeType:n,leadTimesConfig:s}){const o=ya(t,n),a=Dt(s),r=(e==null?void 0:e.submittalsRequired)!==!1;(e==null?void 0:e.hasDeckScope)??o.includeDeck;const c=!!((e==null?void 0:e.hasJoistScope)??o.includeJoists),l=g(e==null?void 0:e.totalTons),d=[];if(r){const k=Os(a,{hasJoistScope:c,totalTons:l});k.min!==""&&k.max!==""&&d.push({source:"TROJAN",component:"Submittals",min:k.min,max:k.max,rule:k.key})}const p=new Set;o.deckSuppliers.forEach(k=>p.add(k)),o.joistSuppliers.forEach(k=>p.add(k)),p.forEach(k=>{var C,b,h,L;const S=k.toLowerCase(),T=w((b=(C=a[S])==null?void 0:C.fabrication)==null?void 0:b.min),E=w((L=(h=a[S])==null?void 0:h.fabrication)==null?void 0:L.max);T!==""&&E!==""&&d.push({source:k,component:"Fabrication",min:T,max:E})});const u=[];let m=null,f=null;return d.forEach(k=>{u.push(k),m=m===null?k.min:Math.max(m,k.min),f=f===null?k.max:Math.max(f,k.max)}),{min:m===null?"":m,max:f===null?"":f,breakdown:u}}function pn(t){const e=w(t==null?void 0:t.min),n=w(t==null?void 0:t.max);return e===""||n===""?"":`${e}-${n} WEEKS`}function Ga(){var l,d;const t=new Set;(((l=i.vendorPlan)==null?void 0:l.deckAssignments)||[]).forEach(p=>{if(g(p==null?void 0:p.tons)<=0)return;const u=String((p==null?void 0:p.vendor)||"").trim().toUpperCase();zt.includes(u)&&t.add(u)});const e=new Set;if(g(i.joists.tons)>0){const p=String(((d=i.vendorPlan)==null?void 0:d.chosenJoistVendor)||i.joists.supplier||"").trim().toUpperCase();zt.includes(p)&&e.add(p)}const s=t.size>0&&e.size>0?"deckAndJoist":t.size>0?"deckOnly":e.size>0?"joistOnly":"deckAndJoist",o=js(),a=g(i.totals.totalDeckTons)+g(i.joists.tons),r=Is({supplierSelections:{deckSuppliers:[...t],joistSuppliers:[...e]},specType:{submittalsRequired:!0,hasDeckScope:t.size>0,hasJoistScope:e.size>0,totalTons:a},scopeType:s,leadTimesConfig:o}),c=Os(o,{hasDeckScope:t.size>0,hasJoistScope:e.size>0,totalTons:a});i.submittalsLeadTime=pn(c),i.fabricationLeadTime=pn(r),nt&&(nt.value=i.submittalsLeadTime),it&&(it.value=i.fabricationLeadTime)}function jn(t=ut()){var m,f,k,S,T,E,C,b,h,L;const e=new Set,n=new Set,s=new Set,o=v((m=t.trojan)==null?void 0:m.coilCostPerLb),a=v((f=t.trojan)==null?void 0:f.inboundFreightPerLb),r=v((k=t.trojan)==null?void 0:k.laborPerLb);(o>0||a>0||r>0)&&e.add("TROJAN");const c=v((S=t.trojan)==null?void 0:S.accessoriesCostPerScrew),l=v((T=t.trojan)==null?void 0:T.accessoriesCostPerTon);return(c>0||l>0)&&s.add("TROJAN"),(((C=(E=t.csc)==null?void 0:E.deck)==null?void 0:C.buckets)||[]).some(j=>v(j==null?void 0:j.cost)>0)&&e.add("CSC"),(((h=(b=t.csc)==null?void 0:b.joists)==null?void 0:h.buckets)||[]).some(j=>v(j==null?void 0:j.cost)>0)&&n.add("CSC"),v((L=t.cano)==null?void 0:L.perLb)>0&&(e.add("CANO"),n.add("CANO")),{pricedDeckSuppliers:e,pricedJoistSuppliers:n,pricedAccessorySuppliers:s}}function La(t,e){const n=String(t||"").trim().toUpperCase(),s=g(e);if(s<=0)return{vendor:n,tons:0,subtotalCost:0,marginPercent:$t("brokeredDeck"),marginAmount:0,totalCost:0,detail:"No supplier deck tons in scope"};if(n==="TROJAN"){const l=Qt(s);return{vendor:"TROJAN",tons:s,subtotalCost:l.totalCogs,marginPercent:l.marginPercent,marginAmount:l.marginAmount,totalCost:l.totalWithMargin,detail:`${Y(l.lbs)} LB total production + freight`}}if(n==="CANO"||n==="CSC")return vs(n,e);const o=ut(),a=vt(n,s,o);if(g(a)<=0)return{vendor:n,tons:s,subtotalCost:0,marginPercent:$t("brokeredDeck"),marginAmount:0,totalCost:0,detail:"No admin pricing configured for this supplier"};const r=s*a,c=tt(r,"brokeredDeck");return{vendor:n,tons:s,subtotalCost:r,marginPercent:c.marginPercent,marginAmount:c.marginAmount,totalCost:c.totalWithMargin,detail:`${G(s)} TONS x ${M(a)}/TON`}}function ja(t){const e=new Map;(t||[]).forEach(c=>{const l=g(c.tons);if(l<=0)return;const d=String(c.vendor||"").trim().toUpperCase();e.set(d,(e.get(d)||0)+l)});const n=Array.from(e.entries()).map(([c,l])=>La(c,l)),s=n.reduce((c,l)=>c+g(l.totalCost),0),o=n.reduce((c,l)=>c+g(l.marginAmount),0),a=n.reduce((c,l)=>c+g(l.tons),0),r=n.map(c=>`${c.vendor}: ${c.detail}`).join(" | ");return{vendor:n.length===1?n[0].vendor:"MIXED",tons:a,marginAmount:o,totalCost:s,detail:r,entries:n}}function Oa(t,e){const n=[];((t==null?void 0:t.entries)||[]).forEach(s=>{n.push({supplier:String(s.vendor||"").trim().toUpperCase(),subtotalCost:g(s.subtotalCost),marginAmount:g(s.marginAmount),locked:String(s.vendor||"").trim().toUpperCase()==="TROJAN"?!!i.pricingMarginOverrides.trojanDeck:!!i.pricingMarginOverrides.brokeredDeck,sync:o=>{s.marginAmount=o,s.marginPercent=s.subtotalCost>0?o/s.subtotalCost*100:s.marginPercent,s.totalCost=s.subtotalCost+s.marginAmount}})}),e&&n.push({supplier:String(e.vendor||"").trim().toUpperCase(),subtotalCost:g(e.subtotalCost),marginAmount:g(e.marginAmount),locked:!!i.pricingMarginOverrides.joists,sync:s=>{e.marginAmount=s,e.marginPercent=e.subtotalCost>0?s/e.subtotalCost*100:e.marginPercent,e.totalCost=e.subtotalCost+e.marginAmount}}),qi(n,vn()),t&&(t.marginAmount=(t.entries||[]).reduce((s,o)=>s+g(o.marginAmount),0),t.totalCost=(t.entries||[]).reduce((s,o)=>s+g(o.totalCost),0),t.detail=(t.entries||[]).map(s=>`${s.vendor}: ${s.detail}`).join(" | "))}function Ia(t,e,n){const s=ge().totalCogs||0,o=jn(n),a=hs(t,e,n,o),r=ys(t,e,o),c=new Map;return a.forEach(l=>{r.forEach(d=>{if(t.hasJoistScope&&!d)return;const p=d?Es(d,t.joistTons):null;if(t.hasJoistScope&&g(p==null?void 0:p.totalCost)<=0)return;const u=l.deckBreakdown;Oa(u,p);const m=ha(u,d,t.hasJoistScope);if(!m)return;const k=`${(l.deckAssignments||[]).map(j=>`${j.lineId}:${j.vendor}`).sort().join("|")}::JOIST:${d||""}`;if(c.has(k)||[...new Set((l.deckAssignments||[]).map(j=>j.vendor))].some(j=>!o.pricedDeckSuppliers.has(j))||d&&!o.pricedJoistSuppliers.has(d))return;const T=((u==null?void 0:u.totalCost)||0)+((p==null?void 0:p.totalCost)||0)+s;if(g(T)<=0)return;const E=((u==null?void 0:u.marginAmount)||0)+((p==null?void 0:p.marginAmount)||0),C=Array.from(new Set((l.deckAssignments||[]).filter(j=>g(j.tons)>0).map(j=>String(j.vendor||"").trim().toUpperCase()).filter(j=>zt.includes(j)))),b=d&&zt.includes(String(d).trim().toUpperCase())?[String(d).trim().toUpperCase()]:[],h=C.length>0&&b.length>0?"deckAndJoist":C.length>0?"deckOnly":b.length>0?"joistOnly":"deckAndJoist",L=Is({supplierSelections:{deckSuppliers:C,joistSuppliers:b},specType:{submittalsRequired:!0,hasDeckScope:t.hasDeckScope,hasJoistScope:t.hasJoistScope,totalTons:g(t.deckTons)+g(t.joistTons)},scopeType:h,leadTimesConfig:js()});c.set(k,{label:m,deckVendor:l.deckVendor||"",deckMode:l.deckMode||"auto",deckAssignments:Array.isArray(l.deckAssignments)?l.deckAssignments:[],joistVendor:d||"",deckBreakdown:u,joistBreakdown:p,accessoriesCost:s,totalCost:T,marginAmount:E,leadTimeRange:L})})}),Array.from(c.values()).sort((l,d)=>l.totalCost!==d.totalCost?l.totalCost-d.totalCost:d.marginAmount-l.marginAmount)}function $a(){const t=Ln({deckLines:i.deckProfiles||[],joistTons:i.joists.tons,flags:i.deckFlags||{}}),e=ce().map(c=>Yt(c)).filter(c=>c.supplier!==""),n=fe(e),s=ut(),o=Gs(t.deckLines,t.flags,e,Ns(e)),a=Ls(t.flags,e,As(e)),r=Ia(t,n,s);return{hasComparableScope:t.hasDeckScope||t.hasJoistScope,deckTons:t.deckTons,joistTons:t.joistTons,eligibleDeckVendors:o,eligibleJoistVendors:a,scenarios:r,bestScenario:r[0]||null}}function oe(){if(!pt)return;if(xt&&(xt.classList.toggle("is-loading",!!i.pricingOptimizationLoading),xt.setAttribute("aria-label",i.pricingOptimizationLoading?"Optimizing":"Optimize")),!i.pricingOptimizationVisible){pt.classList.add("hidden"),pt.innerHTML="";return}if(i.pricingOptimizationLoading){pt.classList.remove("hidden"),pt.innerHTML='<p class="help-text pricing-optimize-loading-text">CRUNCHING NUMBERS...</p>';return}const t=$a();if(i.pricingOptimizationScenarios=t.scenarios,!t.hasComparableScope||t.scenarios.length===0){const n=t.deckTons>0&&t.eligibleDeckVendors.length===0?"No deck supplier option meets current supplier-list specs/product rules with available pricing.":"",s=t.joistTons>0&&t.eligibleJoistVendors.length===0?"No joist supplier option meets current supplier-list specs/product rules with available pricing.":"",o=[n,s].filter(Boolean).join(" ");pt.classList.remove("hidden"),pt.innerHTML=`<p class="help-text">${o||"No valid supplier setup available for current scope/specs with configured pricing."}</p>`;return}const e=t.scenarios.map((n,s)=>{const o=s===0,a=i.appliedOptimizationSelection.label!==""&&i.appliedOptimizationSelection.label===n.label&&i.appliedOptimizationSelection.deckMode===(n.deckMode||"auto")&&i.appliedOptimizationSelection.deckVendor===(n.deckVendor||"")&&i.appliedOptimizationSelection.joistVendor===(n.joistVendor||""),r=n.deckBreakdown&&Number.isFinite(n.deckBreakdown.marginPercent)?` | MARGIN ${G(n.deckBreakdown.marginPercent)}%`:n.deckBreakdown?` | MARGIN ${y(n.deckBreakdown.marginAmount||0)}`:"",c=n.deckBreakdown&&Array.isArray(n.deckBreakdown.entries)?n.deckBreakdown.entries.map(u=>{const m=Number.isFinite(u.marginPercent)?` | MARGIN ${G(u.marginPercent)}%`:` | MARGIN ${y(u.marginAmount||0)}`;return`
                  <p class="pricing-line-item-meta">
                    DECK (${u.vendor}): ${u.detail}${m}
                    | TOTAL ${y(u.totalCost)}
                  </p>
                `}).join(""):n.deckBreakdown?`
              <p class="pricing-line-item-meta">
                DECK (${n.deckBreakdown.vendor}): ${n.deckBreakdown.detail}${r}
                | TOTAL ${y(n.deckBreakdown.totalCost)}
              </p>
            `:"",l=n.joistBreakdown&&n.joistBreakdown.surcharge>0?` | SURCHARGE ${y(n.joistBreakdown.surcharge)}`:"",d=n.joistBreakdown?`
          <p class="pricing-line-item-meta">
            JOISTS (${n.joistBreakdown.vendor}): ${n.joistBreakdown.detail}${l}
            | MARGIN ${G(n.joistBreakdown.marginPercent)}%
            | TOTAL ${y(n.joistBreakdown.totalCost)}
          </p>
        `:"",p=n.leadTimeRange?`<p class="pricing-line-item-meta">LEAD TIME: ${pn(n.leadTimeRange)||"N/A"}</p>`:"";return`
        <div class="pricing-line-item ${o?"pricing-optimization-best":""}">
          <div class="pricing-line-item-main">
            <span>OPTION: ${n.label}</span>
            <strong>${y(n.totalCost)}</strong>
          </div>
          <div class="pricing-option-secondary">
            <p class="pricing-line-item-meta pricing-line-item-meta-margin">
              <span>TOTAL MARGIN:</span>
              <span>${y(n.marginAmount||0)}</span>
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
          ${d}
          ${p}
        </div>
      `}).join("");pt.classList.remove("hidden"),pt.innerHTML=`
    <div class="pricing-project-summary">
      <div class="pricing-line-item">
        <div class="pricing-line-item-main">
          <span>OPTIMIZATION SUMMARY</span>
          <span>PROJECT PRICE</span>
        </div>
      </div>
      ${e}
    </div>
  `}function Pa(t){const e=i.pricingOptimizationScenarios[t];e&&(i.appliedOptimizationSelection={deckMode:e.deckMode||"auto",deckVendor:e.deckVendor||"",deckAssignments:Array.isArray(e.deckAssignments)?e.deckAssignments.map(n=>({lineId:n.lineId,vendor:String(n.vendor||"").trim().toUpperCase()})):[],joistVendor:e.joistVendor||"",label:e.label||""},i.pricingOptimizationVisible=!1,O())}function Ti(t){const e=t instanceof Date?t:new Date,n=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0"),o=e.getFullYear();return`${n}/${s}/${o}`}function Da(t){const e=Number.isFinite(t)&&t>0?Math.floor(t):on;return`${Ms}${String(e).padStart(6,"0")}`}function Ma(){try{const t=window.localStorage.getItem(Mn),e=Number.parseInt(String(t??""),10),n=Number.isFinite(e)&&e>=on?e:on,s=Da(n),o=window.localStorage.getItem(Rn),a=JSON.parse(o||"[]"),r=Array.isArray(a)?a:[];return r.push({quoteRef:s,generatedAt:new Date().toISOString(),projectName:i.projectName||"",location:i.projectLocation||""}),window.localStorage.setItem(Mn,String(n+1)),window.localStorage.setItem(Rn,JSON.stringify(r)),s}catch{return`TROJ-${Date.now().toString().slice(-8)}`}}function Ra(t={}){var I;const e=String(t.quoteRef||"").trim(),n=new Date,s=new Date(n);s.setDate(s.getDate()+30);const o=new Map((((I=i.vendorPlan)==null?void 0:I.deckAssignments)||[]).map(A=>[A.lineId,A])),a=(i.deckProfiles||[]).filter(A=>g(A.rowTons)>0||g(A.rowSqs)>0).map(A=>{const x=o.get(A.id),H=g(A.rowTons),K=g(A.rowSqs),_=g(x==null?void 0:x.pricePerTon);return{type:Fe(A)||A.specs.profile||"Deck",sqs:K,tons:H,manufacturer:String(A.specs.manufacturer||(x==null?void 0:x.vendor)||"").trim(),pricePerTon:_,extended:H*_}}),r=Je(),c=g(i.joists.tons),l=c>0?r.baseCost/c:0,d=(i.joistItems||[]).filter(A=>g(A.tons)>0).map(A=>{const x=g(A.tons),H=g(A.units);return{description:A.series||"Joist",units:H,tons:x,manufacturer:String(i.joists.supplier||"").trim(),pricePerTon:l,extended:x*l}});r.surcharge>0&&d.push({description:"CSC Surcharge (<10 tons)",units:0,tons:0,manufacturer:"CSC",pricePerTon:0,extended:r.surcharge});const p=(i.accessories||[]).map((A,x)=>({type:(A.type||`ACCESSORY #${x+1}`).toUpperCase(),screwCount:Number.isFinite(A.screwCount)?A.screwCount:0,tons:g(A.tons)})).filter(A=>A.screwCount>0||A.tons>0),u=Qt(),m=_e();Ss(u,m,r);const f=u.totalWithMargin||0,k=m.totalCost||0,S=ge().totalCogs||0,T=r.totalCost||0,E=g(i.totals.totalDeckTons),C=g(i.joists.tons),b=f+k+S+T,L=Gn(b,E,C).finalTotal,j=g(u.marginAmount),B=g(u.marginPercent),Z=g(m.marginAmount)+g(r.marginAmount),Q=g(m.subtotalCost)+g(r.subtotalCost),ot=Q>0?Z/Q*100:0,at=j+Z,N=L>0?at/L*100:0;return{quoteRef:e||`TROJ-${Date.now().toString().slice(-8)}`,proposalDate:Ti(n),validUntilDate:Ti(s),projectName:i.projectName||"PROJECT",locationText:i.projectLocation||"",submittalsLeadTime:i.submittalsLeadTime||"",fabricationLeadTime:i.fabricationLeadTime||"",takeoffByTrojan:i.takeoffByTrojan||"YES",cutListProvided:i.cutListProvided||"NO",specsReviewed:i.specsReviewed||"NO",documentConditions:gn(i.admin.sections.trojan.values.documentConditions),contactName:"Trojan Steel Team",contactPhone:"",contactEmail:"",deckLines:a,accessoriesLines:p,joistLines:d,totals:{totalTons:E+C,totalDeckTons:E,totalJoistTons:C,grandTotal:L},margins:{trojan:{amount:j,percent:B},broker:{amount:Z,percent:ot},total:{amount:at,blendedPercent:N}}}}function On(){try{P();const t=Ma(),e=Ra({quoteRef:t});window.localStorage.setItem(Li,JSON.stringify(e));const n=String(e.projectName||"project").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80)||"project",s=String(e.quoteRef||"proposal").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80)||"proposal",o="/proposal-api/health",a="/proposal-api/render";fetch(o).then(async r=>{if(!r.ok){const l=(await r.text()).slice(0,200);throw new Error(`Health check failed at ${o} | status ${r.status} | body: ${l}`)}const c=await r.json().catch(()=>null);if(!c||c.ok!==!0)throw new Error(`Health endpoint returned unexpected payload at ${o}`)}).then(()=>fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({proposalData:e})})).then(async r=>{if(!r.ok){const c=(await r.text()).slice(0,200);throw new Error(`PDF server error at ${a} | status ${r.status} | body: ${c}`)}return r.blob()}).then(r=>{const c=URL.createObjectURL(r),l=document.createElement("a");l.href=c,l.download=`${n}-${s}.pdf`,document.body.appendChild(l),l.click(),l.remove(),window.setTimeout(()=>URL.revokeObjectURL(c),1e3)}).catch(r=>{const c=(r==null?void 0:r.message)||String(r);console.error("Failed to generate proposal PDF",{message:c,proposalApiUrl:a,healthUrl:o,error:r}),window.alert(`Unable to download PDF.
Health URL: ${o}
PDF URL: ${a}
Error: ${c}
Hint: run npm run dev:all and verify /proposal-api/health returns { ok: true }.`)})}catch(t){console.error("Failed to generate proposal",t),window.alert("Unable to generate proposal. Check console for details.")}}function Pt(){var f,k,S,T,E,C;if(!ke||!Xe||!Qe||!Ze||!tn)return;const t=i.scope==="deck-only"||i.scope==="joist-deck",e=i.scope==="joists-only"||i.scope==="joist-deck",n=(((f=i.vendorPlan)==null?void 0:f.deckAssignments)||[]).some(b=>b.vendor==="TROJAN"),s=(((k=i.vendorPlan)==null?void 0:k.deckAssignments)||[]).some(b=>b.vendor!=="TROJAN");ke.classList.toggle("hidden",!n);const o=Array.from(new Set((((S=i.vendorPlan)==null?void 0:S.deckAssignments)||[]).filter(b=>b.vendor!=="TROJAN").map(b=>String(b.vendor||"").trim()).filter(Boolean))),a=Array.from(new Set((i.deckProfiles||[]).map(b=>{var h;return String(((h=b==null?void 0:b.specs)==null?void 0:h.manufacturer)||"").trim().toUpperCase()}).filter(b=>b!==""&&b!=="TROJAN")));if(ti){const b=o.length>0?o:a;ti.textContent=b.length===0?"SUPPLIER DECK":b.length===1?`${b[0]} DECK`:`${b.join(" + ")} DECK`}if(ei){const b=String(((C=(E=(T=i.vendorPlan)==null?void 0:T.pricingSchedule)==null?void 0:E.joists)==null?void 0:C.vendor)||"").trim();ei.textContent=b?`${b} JOISTS`:"JOISTS"}const r=Qt();ke.classList.toggle("hidden",!(t&&n));const c=ge();if(ii){const b=!!i.pricingSections.accessories;ii.textContent=b&&c.hasAccessories?y(c.totalCogs):""}const l=_e(),d=Je();if(Ss(r,l,d),ni){const b=!!i.pricingSections.trojanDeck;ni.textContent=b&&r.hasTrojanDeck?y(r.totalWithMargin):""}if(si){const b=!!i.pricingSections.brokeredDeck;si.textContent=b&&l.hasBrokeredDeck?y(l.totalCost):""}if(oi){const b=!!i.pricingSections.joists;oi.textContent=b&&d.hasJoists?y(d.totalCost):""}const p=(r.totalWithMargin||0)+(c.totalCogs||0)+(l.totalCost||0)+(d.totalCost||0),u=Gn(p,g(i.totals.totalDeckTons),g(i.joists.tons));if(ai){const b=!!i.pricingSections.detailing;ai.textContent=b&&u.subtotal>0?y(u.detailingAmount):""}if(ci&&(ci.textContent=y(u.subtotal)),li&&(li.textContent=y(u.finalTotal)),di){const b=u.finalTotal,h=r.hasTrojanDeck&&r.marginAmount>0?g(r.marginAmount):0,L=r.hasTrojanDeck?g(r.totalCogs):0,j=L>0?h/L*100:0,B=l.hasBrokeredDeck?g(l.marginAmount):0,Z=d.hasJoists?g(d.marginAmount):0,Q=B+Z,ot=(l.hasBrokeredDeck?g(l.subtotalCost):0)+(d.hasJoists?g(d.subtotalCost):0),at=ot>0?Q/ot*100:0,N=h+Q,I=b>0?N/b*100:0,A=[];h>0&&A.push(`
        <div class="pricing-margin-summary-row">
          <div class="pricing-margin-summary-main">
            <span>TROJAN MARGIN</span>
            <strong>${y(h)} (${G(j)}%)</strong>
          </div>
        </div>
      `),Q>0&&A.push(`
        <div class="pricing-margin-summary-row">
          <div class="pricing-margin-summary-main">
            <span>BROKER MARGIN</span>
            <strong>${y(Q)} (${G(at)}%)</strong>
          </div>
        </div>
      `),N>0&&A.push(`
        <div class="pricing-margin-summary-row pricing-margin-summary-total">
          <div class="pricing-margin-summary-main">
            <span>TOTAL MARGIN</span>
            <strong>${y(N)} (${G(I)}%)</strong>
          </div>
        </div>
      `),di.innerHTML=A.length>0?`<div class="pricing-margin-summary">${A.join("")}</div>`:""}Xe.classList.toggle("hidden",!(t&&c.hasAccessories)),Qe.classList.toggle("hidden",!(t&&s)),Ze.classList.toggle("hidden",!e),tn.classList.toggle("hidden",!(t||e));const m={trojanDeck:{section:ke,content:io},accessories:{section:Xe,content:oo},brokeredDeck:{section:Qe,content:so},joists:{section:Ze,content:ao},detailing:{section:tn,content:ro}};Object.keys(m).forEach(b=>{const h=m[b],L=!!i.pricingSections[b];if(!h.content||!h.section)return;h.content.classList.toggle("hidden",L);const j=h.section.querySelector(".pricing-accordion-header"),B=j==null?void 0:j.querySelector(".deck-summary-toggle");j&&j.setAttribute("aria-expanded",String(!L)),B&&(B.textContent=L?"+":"−")}),Qn&&(Qn.innerHTML=pa(r)),ui&&(ui.innerHTML=""),Xn&&(Xn.innerHTML=Ca(l)),pi&&(pi.innerHTML=ma()),Zn&&(Zn.innerHTML=ga(d)),mi&&(mi.innerHTML=ka(u)),oe()}function Ua(){var m;const t={trojan:{...i.admin.sections.trojan.values},csc:le(i.admin.sections.csc.values),cano:Re(i.admin.sections.cano.values)},e=ns({scope:i.scope,projectLocation:i.projectLocation,deckFlags:i.deckFlags,supplierRules:ce(),deckLines:i.deckProfiles.map(f=>({id:f.id,specs:f.specs,rowTons:f.rowTons,rowSqs:f.rowSqs,profileName:Fe(f)})),joistTons:i.joists.tons},t),n=ce().map(f=>Yt(f)).filter(f=>f.supplier!==""),s=i.deckProfiles.filter(f=>g(f.rowTons)>0),o=Gs(s,i.deckFlags||{},n,Ns(n)),a=Ls(i.deckFlags||{},n,As(n)),r=String(i.appliedOptimizationSelection.deckMode||"auto").trim().toLowerCase(),c=String(i.appliedOptimizationSelection.deckVendor||"").trim().toUpperCase(),l=r==="single"&&c!==""&&o.includes(c),d=Array.isArray(i.appliedOptimizationSelection.deckAssignments)&&r==="mix"?i.appliedOptimizationSelection.deckAssignments:[],p=new Map(d.map(f=>[Number(f.lineId),String(f.vendor||"").trim().toUpperCase()]));if(l){const f=ut();e.deckAssignments.forEach(k=>{k.vendor=c,k.reason="Optimization selection override",k.pricePerTon=vt(c,g(k.tons),f),k.extendedTotal=g(k.tons)*g(k.pricePerTon)})}else if(r==="mix"&&p.size>0){const f=ut();e.deckAssignments.forEach(k=>{const S=p.get(Number(k.lineId));if(!S)return;const T=ft(k.lineId),E=S==="TROJAN"&&ye(T,i.deckFlags||{}),C=S!=="TROJAN"&&o.includes(S);!E&&!C||(k.vendor=S,k.reason="Optimization mix override",k.pricePerTon=vt(S,g(k.tons),f),k.extendedTotal=g(k.tons)*g(k.pricePerTon))})}else r==="single"&&c!==""?(i.appliedOptimizationSelection.deckMode="auto",i.appliedOptimizationSelection.deckVendor=""):r==="mix"&&p.size>0&&(i.appliedOptimizationSelection.deckMode="auto",i.appliedOptimizationSelection.deckAssignments=[]);const u=String(i.appliedOptimizationSelection.joistVendor||"").trim().toUpperCase();u!==""&&a.includes(u)?(e.chosenJoistVendor=u,(m=e.pricingSchedule)!=null&&m.joists&&(e.pricingSchedule.joists.vendor=u)):u!==""&&(i.appliedOptimizationSelection.joistVendor=""),e.deckAssignments.forEach(f=>{const k=ft(f.lineId);if(!k)return;const S=f.vendor;k.specs.manufacturer=wo(S),k.manufacturerExplicit=!1}),(i.scope==="joists-only"||i.scope==="joist-deck")&&e.chosenJoistVendor&&(i.joists.supplier=e.chosenJoistVendor,re.value=i.joists.supplier),i.vendorPlan=e,i.totals.trojanDeckTons=e.rollups.trojanDeckTons,i.totals.brokeredDeckTons=e.rollups.brokeredDeckTons,i.totals.deckTotal=e.deckAssignments.reduce((f,k)=>f+k.extendedTotal,0)}function O(){ca(),Ua(),Ga(),i.totals.joistsTotal=la();const t=da();i.totals.trojanShipping=t.cost,i.totals.trojanShippingTrucks=t.trucks,i.totals.trojanShippingMiles=t.miles,i.totals.trojanShippingRate=t.rate;const e=(Qt().totalWithMargin||0)+(ge().totalCogs||0)+(_e().totalCost||0)+(Je().totalCost||0);i.totals.grandTotal=Gn(e,g(i.totals.totalDeckTons),g(i.joists.tons)).finalTotal,Wn&&(Wn.value=G(i.totals.trojanDeckTons||0)),Yn&&(Yn.value=G(i.totals.brokeredDeckTons||0)),_i.value=y(i.totals.deckTotal),Wt(),jo(),Qi(),ua(),Pt()}function ft(t){return i.deckProfiles.find(e=>e.id===t)}function $s(t){if(!(!t||!t.startsWith("p_")))return ft(Number(t.slice(2)))}function wa(t){const e=t.target;if(!(e instanceof Element))return;if(e.closest(".btn-add-profile")){const r=Ge();i.deckProfiles.push(r),i.deckReviewMode=!1,i.deckSpecsCollapsed=!0,ie(r.id),F(),O();return}if(e.closest('[data-action="apply-common-profile"]')){const r=e.closest("[data-row-id]");if(!r)return;const c=ft(Number(r.getAttribute("data-row-id")));if(!c)return;Jo(c),F(),O();return}if(e.closest(".btn-add-accessory")){const r=ss();i.accessories.push(r),i.deckReviewMode=!1,i.deckSpecsCollapsed=!0,ie(-1),vi(r.id),F(),z();return}if(e.closest(".btn-done-accordions")){if(i.deckReviewMode){i.deckReviewMode=!1,F(),z();return}O(),i.deckReviewMode=!0,i.deckSpecsCollapsed=!0,ie(-1),vi(-1),F(),z();return}if(e.closest(".btn-duplicate-profile")){if(i.deckProfiles.length===1){const r=us(i.deckProfiles[0]);i.deckProfiles.push(r),i.deckReviewMode=!1,i.deckSpecsCollapsed=!0,ie(r.id),F(),O();return}i.deckProfiles.length>1&&(Ji.innerHTML=i.deckProfiles.map((r,c)=>`<option value="${r.id}">${c+1}. ${Fe(r)}</option>`).join(""),fn.showModal());return}if(e.closest(".btn-remove-row")){const r=e.closest("[data-accessory-id]");if(r){const d=xe(Number(r.getAttribute("data-accessory-id")));if(!d)return;i.accessories=i.accessories.filter(p=>p.id!==d.id),i.deckProfiles.length===0&&(i.deckReviewMode=!1),F(),z();return}const c=e.closest("[data-row-id]");if(!c)return;const l=ft(Number(c.getAttribute("data-row-id")));if(!l)return;i.deckProfiles=i.deckProfiles.filter(d=>d.id!==l.id),i.deckProfiles.length===0&&(i.deckReviewMode=!1),F(),O(),z();return}if(e.closest(".deck-row-content")){t.stopPropagation();return}if(e.closest('[data-action="toggle-specs"]')){const r=!i.deckSpecsCollapsed;i.deckProfiles.forEach(c=>{c.isCollapsed=!0}),i.deckSpecsCollapsed=r,F();return}const s=e.closest(".deck-summary-row");if(!s)return;const o=s.getAttribute("data-id")||"";if(o.startsWith("a_")){i.deckSpecsCollapsed=!0,ms(Number(o.slice(2))),F();return}const a=$s(s.getAttribute("data-id"));a&&(i.deckSpecsCollapsed=!0,ps(a.id),F())}function Ba(t){const e=t.target;if(!(e instanceof HTMLInputElement||e instanceof HTMLSelectElement))return;const n=e.getAttribute("data-group"),s=e.getAttribute("data-field");if(n==="accessory"&&s==="type"){const r=e.closest("[data-accessory-id]");if(!r)return;const c=xe(Number(r.getAttribute("data-accessory-id")));if(!c)return;c.type=e.value||"",Le(c.type)?c.tons=null:je(c.type)?c.screwCount=null:(c.screwCount=null,c.tons=null),F(),O();return}if(n==="deck-flags"&&s){e instanceof HTMLInputElement&&e.type==="checkbox"?(i.deckFlags[s]=!!e.checked,e.checked?(i.deckFlagSelectionOrder=i.deckFlagSelectionOrder.filter(r=>r!==s),i.deckFlagSelectionOrder.push(s)):i.deckFlagSelectionOrder=i.deckFlagSelectionOrder.filter(r=>r!==s),s==="specifiedManufacturer"&&!e.checked&&(i.deckFlags.specifiedManufacturerName="")):i.deckFlags[s]=String(e.value||"").trim().toUpperCase(),O(),F();return}const o=e.closest("[data-row-id]");if(!o)return;const a=ft(Number(o.getAttribute("data-row-id")));if(a&&!(!n||!s)){if(n==="specs"){a.specs[s]=e.value||"",s==="manufacturer"&&(a.manufacturerExplicit=a.specs.manufacturer!==""),(s==="depth"||s==="manufacturer")&&ds(a),s==="profile"&&dn(a),F(),O();return}if(n==="row"&&s==="method"){a.method=e.value,a.inputs=is(),dn(a),F(),O();return}if(n==="row"&&s==="overrideTons"){a.overrideTons=e.value,O();return}}}function xa(t){const e=t.target;if(!(e instanceof HTMLInputElement))return;const n=e.getAttribute("data-group"),s=e.getAttribute("data-field");if(n==="accessory"&&(s==="screwCount"||s==="tons")){const r=e.closest("[data-accessory-id]");if(!r)return;const c=xe(Number(r.getAttribute("data-accessory-id")));if(!c)return;if(s==="screwCount"){const l=Number.parseInt(e.value,10);c.screwCount=Number.isFinite(l)&&l>=0?l:null}else{const l=Number(e.value);c.tons=Number.isFinite(l)&&l>=0?l:null}O();return}const o=e.closest("[data-row-id]");if(!o)return;const a=ft(Number(o.getAttribute("data-row-id")));if(a&&!(!n||!s)){if(n==="inputs"){a.inputs[s]=e.value,O();return}if(n==="row"&&s==="overrideTons"){a.overrideTons=e.value,O();return}}}function Fa(t){if(!(t.target instanceof Element))return;if(t.target.closest('[data-action="toggle-specs"]')&&(t.key==="Enter"||t.key===" ")){t.preventDefault();const a=!i.deckSpecsCollapsed;i.deckProfiles.forEach(r=>{r.isCollapsed=!0}),i.deckSpecsCollapsed=a,F();return}const n=t.target.closest(".deck-summary-row");if(!n||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const s=n.getAttribute("data-id")||"";if(s.startsWith("a_")){i.deckSpecsCollapsed=!0,ms(Number(s.slice(2))),F();return}const o=$s(n.getAttribute("data-id"));o&&(i.deckSpecsCollapsed=!0,ps(o.id),F())}function Ja(t){const e=t.target;if(!(e instanceof Element))return;if(e.closest(".btn-remove-joist")){const s=e.closest("[data-joist-id]");if(!s)return;const o=we(Number(s.getAttribute("data-joist-id")));if(!o)return;i.joistItems=i.joistItems.filter(a=>a.id!==o.id),i.joistReviewMode=!1,Be(),gt(),Et(),z(),O();return}if(e.closest(".deck-row-content")){t.stopPropagation();return}const n=e.closest("[data-joist-summary-id]");n&&(ls(Number(n.getAttribute("data-joist-summary-id"))),gt())}function _a(t){const e=t.target;if(!(e instanceof HTMLInputElement||e instanceof HTMLSelectElement))return;const n=e.closest("[data-joist-id]");if(!n)return;const s=we(Number(n.getAttribute("data-joist-id")));if(!s)return;const o=e.getAttribute("data-group"),a=e.getAttribute("data-field");o!=="joist"||!a||a==="series"&&(i.joistReviewMode=!1,s.series=e.value||"",ln(s.series)&&(s.units=""),gt(),Et(),z(),O())}function Va(t){const e=t.target;if(!(e instanceof HTMLInputElement))return;const n=e.closest("[data-joist-id]");if(!n)return;const s=we(Number(n.getAttribute("data-joist-id")));if(!s)return;const o=e.getAttribute("data-group"),a=e.getAttribute("data-field");if(!(o!=="joist"||!a)){if(a==="units"){i.joistReviewMode=!1;const r=Number.parseInt(e.value,10);s.units=Number.isFinite(r)&&r>=0?String(r):""}else a==="tons"&&(i.joistReviewMode=!1,s.tons=e.value);Be(),Et(),z(),O()}}function qa(t){if(!(t.target instanceof Element))return;const e=t.target.closest("[data-joist-summary-id]");!e||t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),ls(Number(e.getAttribute("data-joist-summary-id"))),gt())}Ae.addEventListener("input",t=>{i.projectName=t.target.value,En(),Wt()});ae.addEventListener("input",t=>{i.projectLocation=t.target.value,pe(),O(),Wt()});Gt==null||Gt.addEventListener("change",t=>{const e=String(t.target.value||"2");i.projectComplexityTier=["1","2","3"].includes(e)?e:"2",O()});nt==null||nt.addEventListener("input",t=>{i.submittalsLeadTime=String(t.target.value||"")});it==null||it.addEventListener("input",t=>{i.fabricationLeadTime=String(t.target.value||"")});Lt==null||Lt.addEventListener("change",t=>{i.takeoffByTrojan=String(t.target.value||"").toUpperCase()==="NO"?"NO":"YES"});jt==null||jt.addEventListener("change",t=>{i.cutListProvided=String(t.target.value||"").toUpperCase()==="YES"?"YES":"NO"});Ot==null||Ot.addEventListener("change",t=>{i.specsReviewed=String(t.target.value||"").toUpperCase()==="YES"?"YES":"NO"});At==null||At.addEventListener("input",t=>{i.takeoff.bidNo=String(t.target.value||""),P()});ht==null||ht.addEventListener("input",t=>{i.takeoff.jobNumber=String(t.target.value||""),P()});yt==null||yt.addEventListener("input",t=>{i.takeoff.jobName=String(t.target.value||""),P()});kt==null||kt.addEventListener("input",t=>{i.takeoff.projectLocation=String(t.target.value||""),P()});ze==null||ze.addEventListener("click",()=>{i.takeoff.areas.forEach(e=>{e.isCollapsed=!0});const t=rs();i.takeoff.areas.push(t),yn(),R(),P()});Nt==null||Nt.addEventListener("click",()=>{i.takeoff.areas.forEach(t=>{t.isCollapsed=!0,t.deckSectionCollapsed=!0,t.joistSectionCollapsed=!0,t.deckLines.forEach(e=>{e.isCollapsed=!0}),(t.joistGroups||[]).forEach(e=>{e.isCollapsed=!0})}),R(),P()});$==null||$.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const n=e.closest('[data-action="takeoff-remove-area"]');if(n){const C=n.closest("[data-takeoff-area-id]");if(!C)return;const b=Number(C.getAttribute("data-takeoff-area-id"));i.takeoff.areas=i.takeoff.areas.filter(h=>Number(h.id)!==b),yn(),R(),P();return}const s=e.closest('[data-action="takeoff-remove-mark"]');if(s){const C=s.closest("[data-takeoff-group-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const h=Number(C.getAttribute("data-takeoff-group-id"));b.joistGroups=(b.joistGroups||[]).filter(L=>Number(L.id)!==h),R(),P();return}const o=e.closest('[data-action="toggle-takeoff-area"]');if(o){const C=o.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;!!b.isCollapsed?(i.takeoff.areas.forEach(L=>{L.isCollapsed=!0}),b.isCollapsed=!1):b.isCollapsed=!0,R(),P();return}const a=e.closest('[data-action="toggle-takeoff-deck-line"]');if(a){const C=a.closest("[data-takeoff-line-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const h=Number(C.getAttribute("data-takeoff-line-id")),L=b.deckLines.find(B=>Number(B.id)===h);if(!L)return;!!L.isCollapsed?(b.deckLines.forEach(B=>{B.isCollapsed=!0}),L.isCollapsed=!1):L.isCollapsed=!0,R(),P();return}const r=e.closest('[data-action="toggle-takeoff-deck-section"]');if(r){const C=r.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;b.deckSectionCollapsed=!b.deckSectionCollapsed,R(),P();return}const c=e.closest('[data-action="toggle-takeoff-joist-section"]');if(c){const C=c.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;b.joistSectionCollapsed=!b.joistSectionCollapsed,R(),P();return}const l=e.closest('[data-action="toggle-takeoff-joist-group"]');if(l){const C=l.closest("[data-takeoff-group-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const h=Number(C.getAttribute("data-takeoff-group-id")),L=(b.joistGroups||[]).find(B=>Number(B.id)===h);if(!L)return;!!L.isCollapsed?((b.joistGroups||[]).forEach(B=>{B.isCollapsed=!0}),L.isCollapsed=!1):L.isCollapsed=!0,R(),P();return}const d=e.closest('[data-action="takeoff-add-deck"]');if(d){const C=d.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const h=as();b.deckLines.forEach(L=>{L.isCollapsed=!0}),b.deckLines.push(h),b.quickLineId=h.id,b.isCollapsed=!1,Si(b.id),b.isCollapsed=!1,R(),P();return}const p=e.closest('[data-action="takeoff-add-mark"]');if(p){const C=p.closest("[data-takeoff-area-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const h=cn();h.marks.push(rn()),b.joistGroups=Array.isArray(b.joistGroups)?b.joistGroups:[],b.joistGroups.forEach(L=>{L.isCollapsed=!0}),b.joistGroups.push(h),b.isCollapsed=!1,Si(b.id),b.isCollapsed=!1,R(),P();return}const u=e.closest('[data-action="takeoff-quick-profile"]');if(u){const C=u.closest("[data-takeoff-line-id]");if(!C)return;const b=V(Number(C.getAttribute("data-takeoff-area-id")));if(!b)return;const h=b.deckLines.find(L=>Number(L.id)===Number(C.getAttribute("data-takeoff-line-id")));if(!h)return;b.quickLineId=h.id,_o(h,u.getAttribute("data-preset")),R(),P();return}const m=e.closest('[data-action="takeoff-remove-deck-line"]'),f=e.closest('[data-action="takeoff-remove-joist-line"]');if(!m&&!f)return;const k=(m||f).closest("[data-takeoff-line-id]");if(!k)return;const S=V(Number(k.getAttribute("data-takeoff-area-id")));if(!S)return;const T=Number(k.getAttribute("data-takeoff-line-id"));if(String(k.getAttribute("data-takeoff-kind")||"deck").toLowerCase()==="joist"||f){const C=Number(k.getAttribute("data-takeoff-group-id")),b=(S.joistGroups||[]).find(h=>Number(h.id)===C);if(!b)return;b.marks=(b.marks||[]).filter(h=>Number(h.id)!==T)}else S.deckLines=S.deckLines.filter(C=>Number(C.id)!==T),Number(S.quickLineId)===T&&(S.quickLineId=S.deckLines.length>0?S.deckLines[S.deckLines.length-1].id:null);R(),P()});$==null||$.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-area"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-area-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));if(!s)return;!!s.isCollapsed?(i.takeoff.areas.forEach(a=>{a.isCollapsed=!0}),s.isCollapsed=!1):s.isCollapsed=!0,R(),P()});$==null||$.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-deck-section"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-area-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));s&&(s.deckSectionCollapsed=!s.deckSectionCollapsed,R(),P())});$==null||$.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-joist-section"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-area-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));s&&(s.joistSectionCollapsed=!s.joistSectionCollapsed,R(),P())});$==null||$.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-deck-line"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-line-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));if(!s)return;const o=Number(n.getAttribute("data-takeoff-line-id")),a=s.deckLines.find(c=>Number(c.id)===o);if(!a)return;!!a.isCollapsed?(s.deckLines.forEach(c=>{c.isCollapsed=!0}),a.isCollapsed=!1):a.isCollapsed=!0,R(),P()});$==null||$.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-takeoff-joist-group"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.closest("[data-takeoff-group-id]");if(!n)return;const s=V(Number(n.getAttribute("data-takeoff-area-id")));if(!s)return;const o=Number(n.getAttribute("data-takeoff-group-id")),a=(s.joistGroups||[]).find(c=>Number(c.id)===o);if(!a)return;!!a.isCollapsed?((s.joistGroups||[]).forEach(c=>{c.isCollapsed=!0}),a.isCollapsed=!1):a.isCollapsed=!0,R(),P()});$==null||$.addEventListener("input",t=>{const e=t.target;if(!(e instanceof HTMLInputElement)&&!(e instanceof HTMLSelectElement))return;const n=e.getAttribute("data-takeoff-field");if(!n)return;const s=e.closest("[data-takeoff-line-id]");if(!s)return;const o=V(Number(s.getAttribute("data-takeoff-area-id")));if(!o)return;const a=Number(s.getAttribute("data-takeoff-line-id"));if(String(s.getAttribute("data-takeoff-kind")||"deck").toLowerCase()==="joist"){const l=Number(s.getAttribute("data-takeoff-group-id")),d=(o.joistGroups||[]).find(u=>Number(u.id)===l);if(!d)return;const p=(d.marks||[]).find(u=>Number(u.id)===a);if(!p)return;Object.prototype.hasOwnProperty.call(p,n)&&(p[n]=e.value),P();return}const c=o.deckLines.find(l=>Number(l.id)===a);c&&(n==="squares"?c.squares=e.value:Object.prototype.hasOwnProperty.call(c.specs,n)&&(c.specs[n]=e.value),P())});$==null||$.addEventListener("change",t=>{const e=t.target;if(!(e instanceof HTMLInputElement)&&!(e instanceof HTMLSelectElement))return;const n=e.getAttribute("data-takeoff-field");if(!n)return;const s=e.closest("[data-takeoff-line-id]");if(!s)return;const o=V(Number(s.getAttribute("data-takeoff-area-id")));if(!o)return;const a=Number(s.getAttribute("data-takeoff-line-id"));if(String(s.getAttribute("data-takeoff-kind")||"deck").toLowerCase()==="joist"){const l=Number(s.getAttribute("data-takeoff-group-id")),d=(o.joistGroups||[]).find(u=>Number(u.id)===l);if(!d)return;const p=(d.marks||[]).find(u=>Number(u.id)===a);if(!p)return;Object.prototype.hasOwnProperty.call(p,n)&&(p[n]=e.value),R(),P();return}const c=o.deckLines.find(l=>Number(l.id)===a);c&&(n==="squares"?c.squares=e.value:Object.prototype.hasOwnProperty.call(c.specs,n)&&(c.specs[n]=e.value),R(),P())});Ct&&Ct.addEventListener("input",t=>{i.milesFromTrojanFacility=t.target.value,O(),Wt()});xi.forEach(t=>{t.addEventListener("change",e=>{i.scope=e.target.value,z(),Wt(),Ue().includes(i.currentPage)||et("project")})});wt==null||wt.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;const n=e.closest("[data-main-tab]");if(!n||!(n instanceof HTMLButtonElement)||n.disabled)return;const s=String(n.getAttribute("data-main-tab")||"").trim();s&&et(s)});wi.addEventListener("click",()=>{Wt()&&Tn()});Ws.addEventListener("click",Nn);ve.addEventListener("click",()=>{O(),Tn()});Ys.addEventListener("click",Nn);Fi.addEventListener("click",()=>{O(),Qi()&&Tn()});Qs.addEventListener("click",Nn);We==null||We.addEventListener("click",()=>{zi(),Hi()});Bt==null||Bt.addEventListener("click",()=>{zi(),Hi()});Xs.addEventListener("click",()=>et("project"));xt==null||xt.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),i.pricingOptimizationVisible=!i.pricingOptimizationVisible,oe()});Ye==null||Ye.addEventListener("click",()=>{On()});Vs.addEventListener("click",()=>et("admin"));qs.addEventListener("click",()=>et(i.adminReturnPage||"project"));zs.addEventListener("click",()=>et("project"));Ke==null||Ke.addEventListener("click",ts);Hs.addEventListener("click",()=>{Zo(),Bi.showModal()});Ks.addEventListener("click",()=>Bi.close());en==null||en.addEventListener("click",()=>et("admin"));Jt==null||Jt.addEventListener("click",()=>{i.suppliers.isLoaded&&(i.suppliers.draftRows=i.suppliers.rows.map(t=>({...t})),i.suppliers.isEditing=!0,St())});Vt==null||Vt.addEventListener("click",()=>{i.suppliers.draftRows=i.suppliers.rows.map(t=>({...t})),i.suppliers.isEditing=!1,i.suppliers.loadError="",St()});qt==null||qt.addEventListener("click",()=>{if(!i.suppliers.isEditing)return;const t={};i.suppliers.columns.forEach(e=>{t[e]=""}),i.suppliers.draftRows.push(t),St()});_t==null||_t.addEventListener("click",()=>{if(!i.suppliers.isEditing)return;const t=Eo(i.suppliers.draftRows,i.suppliers.columns,i.suppliers.nameColumnKey);if(!t.isValid){Te(t.message);return}i.suppliers.rows=Ki(i.suppliers.draftRows,i.suppliers.columns),localStorage.setItem(Gi,JSON.stringify(i.suppliers.rows)),i.suppliers.draftRows=i.suppliers.rows.map(e=>({...e})),i.suppliers.isEditing=!1,i.suppliers.loadError="",St()});ct==null||ct.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element)||!i.suppliers.isEditing)return;const n=e.closest("[data-suppliers-delete-row]");if(!n)return;const s=Number(n.getAttribute("data-suppliers-delete-row"));!Number.isInteger(s)||s<0||(i.suppliers.draftRows.splice(s,1),St())});ct==null||ct.addEventListener("input",t=>{const e=t.target;if(!(e instanceof HTMLInputElement)||!i.suppliers.isEditing)return;const n=Number(e.getAttribute("data-suppliers-row")),s=e.getAttribute("data-suppliers-column");if(!Number.isInteger(n)||n<0||!s)return;const o=i.suppliers.draftRows[n];!o||!Object.prototype.hasOwnProperty.call(o,s)||(o[s]=e.value)});Ut==null||Ut.addEventListener("click",t=>{const e=t.target;e instanceof Element&&e.closest("#adminSuppliersButton")&&ts()});st.addEventListener("click",t=>{var T;const e=t.target;if(!(e instanceof Element))return;const n=e.closest('[data-action="trojan-toggle-edit"]');if(n){const E=n.getAttribute("data-trojan-subsection"),C=E?i.admin.sections.trojan.subsections[E]:null;if(!E||!C)return;if(C.isEditing){aa(E);return}C.isEditing=!0,D();return}const s=e.closest('[data-action="leadtime-toggle-edit"]');if(s){const E=String(s.getAttribute("data-leadtime-supplier")||"").toLowerCase(),C=$e(E);if(!C)return;if(C.subsection.isEditing){ra(E);return}C.subsection.error="",C.subsection.isEditing=!0,D();return}const o=e.closest('[data-action="leadtime-toggle-sub"]');if(o){const E=String(o.getAttribute("data-leadtime-supplier")||"").toLowerCase();if(!$e(E))return;E==="trojan"?Ie("leadTimes"):E==="csc"?Oe("leadTimes"):E==="cano"&&fs("leadTimes"),D();return}if(e.closest('[data-action="trojan-add-condition-row"]')){oa();return}const r=e.closest('[data-action="trojan-remove-condition-row"]');if(r){const E=(T=i.admin.sections.trojan.subsections)==null?void 0:T.conditions;if(!E||!E.isEditing)return;const C=Number.parseInt(String(r.getAttribute("data-trojan-condition-id")||""),10);if(!Number.isFinite(C)||C<=0)return;i.admin.sections.trojan.values.documentConditions=(i.admin.sections.trojan.values.documentConditions||[]).filter(b=>Number.parseInt(String((b==null?void 0:b.id)??""),10)!==C),D();return}const c=e.closest('[data-action="trojan-toggle-sub"]');if(c){const E=c.getAttribute("data-trojan-subsection"),C=E?i.admin.sections.trojan.subsections[E]:null;if(!E||!C)return;Ie(E),D();return}const l=e.closest('[data-action="csc-toggle-edit"]');if(l){const E=l.getAttribute("data-csc-subsection"),C=E?i.admin.sections.csc.subsections[E]:null;if(!E||!C)return;if(C.isEditing){ea(E);return}C.isEditing=!0,D();return}const d=e.closest('[data-action="csc-add-row"]');if(d){const E=d.getAttribute("data-csc-subsection"),C=E?i.admin.sections.csc.subsections[E]:null;if(!E||!C||!C.isEditing)return;na(E);return}const p=e.closest('[data-action="csc-toggle-sub"]');if(p){const E=p.getAttribute("data-csc-subsection"),C=E?i.admin.sections.csc.subsections[E]:null;if(!E||!C)return;Oe(E),D();return}if(e.closest('[data-action="detailing-toggle-edit"]')){const E=i.admin.sections.detailing;if(!E)return;if(E.isEditing){ia();return}E.isEditing=!0,D();return}if(e.closest('[data-action="detailing-add-row"]')){sa();return}const f=e.closest('[data-action="admin-toggle-edit"]');if(f){const E=f.getAttribute("data-section");if(!E||!i.admin.sections[E])return;const C=i.admin.sections[E];if(C.isEditing){ta(E);return}C.isEditing=!0,D();return}const k=e.closest(".admin-summary-row");if(!k)return;const S=k.getAttribute("data-admin-id");!S||!i.admin.sections[S]||i.admin.sections[S].isEditing||S==="trojan"&&bs()||S==="csc"&&ks()||S==="cano"&&Cs()||(gs(S),D())});st.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="trojan-toggle-sub"]');if(e&&(t.key==="Enter"||t.key===" ")){t.preventDefault();const r=e.getAttribute("data-trojan-subsection"),c=r?i.admin.sections.trojan.subsections[r]:null;if(!r||!c)return;Ie(r),D();return}const n=t.target.closest('[data-action="csc-toggle-sub"]');if(n&&(t.key==="Enter"||t.key===" ")){t.preventDefault();const r=n.getAttribute("data-csc-subsection"),c=r?i.admin.sections.csc.subsections[r]:null;if(!r||!c)return;Oe(r),D();return}const s=t.target.closest('[data-action="leadtime-toggle-sub"]');if(s&&(t.key==="Enter"||t.key===" ")){t.preventDefault();const r=String(s.getAttribute("data-leadtime-supplier")||"").toLowerCase();if(!$e(r))return;r==="trojan"?Ie("leadTimes"):r==="csc"?Oe("leadTimes"):r==="cano"&&fs("leadTimes"),D();return}const o=t.target.closest(".admin-summary-row");if(!o||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const a=o.getAttribute("data-admin-id");!a||!i.admin.sections[a]||i.admin.sections[a].isEditing||a==="trojan"&&bs()||a==="csc"&&ks()||a==="cano"&&Cs()||(gs(a),D())});st.addEventListener("focusin",t=>{var o;const e=t.target;if(!(e instanceof HTMLInputElement)||!e.hasAttribute("data-admin-field"))return;const n=e.closest("[data-admin-section]");if(!n)return;const s=n.getAttribute("data-admin-section");!s||!((o=i.admin.sections[s])!=null&&o.isEditing)||e.getAttribute("data-admin-type")!=="text"&&e.value.trim()!==""&&(e.value=String(v(e.value)))});st.addEventListener("focusout",t=>{var o;const e=t.target;if(!(e instanceof HTMLInputElement)||!e.hasAttribute("data-admin-field"))return;const n=e.closest("[data-admin-section]");if(!n)return;const s=n.getAttribute("data-admin-section");!s||!((o=i.admin.sections[s])!=null&&o.isEditing)||e.getAttribute("data-admin-type")!=="text"&&e.value.trim()!==""&&(e.value=M(v(e.value)))});It.addEventListener("click",wa);It.addEventListener("change",Ba);It.addEventListener("input",xa);It.addEventListener("keydown",Fa);W==null||W.addEventListener("click",Ja);W==null||W.addEventListener("change",_a);W==null||W.addEventListener("input",Va);W==null||W.addEventListener("keydown",qa);se==null||se.addEventListener("click",()=>{const t=os();i.joistItems.push(t),i.joistReviewMode=!1,zo(t.id),gt(),Be(),Et(),z(),O()});Ft==null||Ft.addEventListener("click",()=>{if(i.joistItems.length!==0){if(i.joistReviewMode){i.joistReviewMode=!1,gt(),Et(),z();return}Be(),i.joistReviewMode=!0,i.joistItems.forEach(t=>{t.isCollapsed=!0}),gt(),Et(),z(),O()}});Zs.addEventListener("click",()=>{const t=Number(Ji.value),e=ft(t);if(e){const n=us(e);i.deckProfiles.push(n),i.deckReviewMode=!1,i.deckSpecsCollapsed=!0,ie(n.id),F(),O(),z()}fn.close()});to.addEventListener("click",()=>{fn.close()});re.addEventListener("change",t=>{i.joists.supplier=t.target.value,O()});de.addEventListener("click",t=>{const e=t.target;if(!(e instanceof Element))return;if(e.closest("#pricingProposalButton")){On();return}if(e.closest("#pricingOptimizeButton")){if(i.pricingOptimizationLoading)return;if(i.pricingOptimizationVisible){i.pricingOptimizationVisible=!1,i.pricingOptimizationLoading=!1,rt&&(window.clearTimeout(rt),rt=null),oe();return}i.pricingOptimizationVisible=!0,i.pricingOptimizationLoading=!0,oe(),rt&&window.clearTimeout(rt),rt=window.setTimeout(()=>{i.pricingOptimizationLoading=!1,rt=null,i.pricingOptimizationVisible&&oe()},650);return}const o=e.closest('[data-action="apply-optimized-option"]');if(o){const d=Number(o.getAttribute("data-optimization-index"));Number.isInteger(d)&&d>=0&&Pa(d);return}if(e.closest('[data-action="pricing-detailing-reset-auto"]')){i.pricingDetailing.detailingPercentOverride=null,Pt();return}const r=e.closest('[data-action="toggle-pricing-section"]');if(!r)return;const c=r.getAttribute("data-pricing-section");if(!c||!Object.prototype.hasOwnProperty.call(i.pricingSections,c))return;!!i.pricingSections[c]?(Object.keys(i.pricingSections).forEach(d=>{i.pricingSections[d]=!0}),i.pricingSections[c]=!1):i.pricingSections[c]=!0,Pt()});de.addEventListener("keydown",t=>{if(!(t.target instanceof Element))return;const e=t.target.closest('[data-action="toggle-pricing-section"]');if(!e||t.key!=="Enter"&&t.key!==" ")return;t.preventDefault();const n=e.getAttribute("data-pricing-section");if(!n||!Object.prototype.hasOwnProperty.call(i.pricingSections,n))return;!!i.pricingSections[n]?(Object.keys(i.pricingSections).forEach(o=>{i.pricingSections[o]=!0}),i.pricingSections[n]=!1):i.pricingSections[n]=!0,Pt()});de.addEventListener("input",t=>{const e=t.target;if(!(e instanceof HTMLInputElement))return;if(e.getAttribute("data-action")==="pricing-detailing-percent-input"){const s=g(e.value);i.pricingDetailing.detailingPercentOverride=s>0?s:0;return}if(e.getAttribute("data-action")!=="pricing-margin-input")return;const n=e.getAttribute("data-pricing-margin-section");!n||!Object.prototype.hasOwnProperty.call(i.pricingMargins,n)||(i.pricingMargins[n]=g(e.value),Object.prototype.hasOwnProperty.call(i.pricingMarginOverrides,n)&&(i.pricingMarginOverrides[n]=!0))});de.addEventListener("change",t=>{const e=t.target;if(!(e instanceof HTMLInputElement))return;if(e.getAttribute("data-action")==="pricing-detailing-percent-input"){const s=g(e.value);i.pricingDetailing.detailingPercentOverride=s>0?s:0,Pt();return}if(e.getAttribute("data-action")!=="pricing-margin-input")return;const n=e.getAttribute("data-pricing-margin-section");!n||!Object.prototype.hasOwnProperty.call(i.pricingMargins,n)||(i.pricingMargins[n]=g(e.value),Object.prototype.hasOwnProperty.call(i.pricingMarginOverrides,n)&&(i.pricingMarginOverrides[n]=!0),Pt())});function za(){ko(),nt&&(nt.readOnly=!0),it&&(it.readOnly=!0),re.value=i.joists.supplier,Ae.value=i.projectName,ae.value=i.projectLocation,Gt&&(Gt.value=["1","2","3"].includes(i.projectComplexityTier)?i.projectComplexityTier:"2"),nt&&(nt.value=i.submittalsLeadTime||""),it&&(it.value=i.fabricationLeadTime||""),Lt&&(Lt.value=i.takeoffByTrojan==="NO"?"NO":"YES"),jt&&(jt.value=i.cutListProvided==="YES"?"YES":"NO"),Ot&&(Ot.value=i.specsReviewed==="YES"?"YES":"NO"),Ct&&(Ct.value=i.milesFromTrojanFacility),At&&(At.value=i.takeoff.bidNo||""),ht&&(ht.value=i.takeoff.jobNumber||""),yt&&(yt.value=i.takeoff.jobName||""),kt&&(kt.value=i.takeoff.projectLocation||""),bo(),En(),z(),F(),gt(),R(),Et(),D(),St(),O(),pe(),et("project")}typeof window<"u"&&(window.openProposalGenerator=On,window.runVendorStrategyHarness=Fo);za();Wi().then(()=>{O()});
