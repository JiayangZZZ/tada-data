
var express = require('express');
var app = express();
var request = require('request');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

var json = require('./JSON/post-labels.json');

var dataLabels = [{"description":"girl","score":39.94479247882727},{"description":"fun","score":25.216591970551583},{"description":"screenshot","score":21.674045538902284},{"description":"product","score":20.344331504404547},{"description":"purple","score":17.790865692496297},{"description":"room","score":16.878006735373113},{"description":"green","score":16.596444029893192},{"description":"font","score":15.826611718606383},{"description":"blue","score":15.070351922795885},{"description":"pink","score":14.650406325856844},{"description":"furniture","score":14.426046064992747},{"description":"line","score":13.440056126032557},{"description":"human hair color","score":13.37562837806486},{"description":"shoulder","score":13.1017731568643},{"description":"text","score":12.942317779929866},{"description":"plant","score":11.474344225866457},{"description":"games","score":11.227308024253164},{"description":"grass","score":10.388669042360215},{"description":"yellow","score":10.355605944281532},{"description":"snapshot","score":10.061939203076893},{"description":"black hair","score":9.81877405113644},{"description":"play","score":9.488608926534651},{"description":"tree","score":9.348834276199343},{"description":"sky","score":9.218684244960071},{"description":"interior design","score":8.490580455178307},{"description":"joint","score":8.485089778450746},{"description":"red","score":8.01606531039117},{"description":"child","score":7.845744291941324},{"description":"design","score":7.737749720755077},{"description":"product design","score":7.20172233134508},{"description":"recreation","score":7.055072824869837},{"description":"arm","score":7.040549016566503},{"description":"computer wallpaper","score":7.033688722621828},{"description":"house","score":6.974089365629922},{"description":"leisure","score":6.541825960079828},{"description":"violet","score":6.214749696354071},{"description":"magenta","score":6.156051419675349},{"description":"flooring","score":5.967220802392278},{"description":"fashion","score":5.9216828644275665},{"description":"hair","score":5.789533558819029},{"description":"skin","score":5.6533773342768345},{"description":"table","score":5.637574832354273},{"description":"technology","score":5.5756733765204745},{"description":"floor","score":5.400080321090562},{"description":"home","score":5.0644691068501695},{"description":"pattern","score":4.9509738703568775},{"description":"toddler","score":4.891083727280299},{"description":"neck","score":4.845157778688839},{"description":"leg","score":4.791196223454816},{"description":"long hair","score":4.604106465975444},{"description":"brown hair","score":4.589796452531739},{"description":"interaction","score":4.520665010526067},{"description":"hairstyle","score":4.3461386164029445},{"description":"graphics","score":4.326278696457545},{"description":"graphic design","score":4.293536990880966},{"description":"human","score":4.250143064061801},{"description":"leaf","score":4.230599423249562},{"description":"muscle","score":4.058512418043046},{"description":"smile","score":3.9328027864297233},{"description":"nature","score":3.807692011197408},{"description":"water","score":3.7739840547243757},{"description":"head","score":3.5593050006363125},{"description":"mouth","score":3.544781719644864},{"description":"illustration","score":3.479480821934957},{"description":"toy","score":3.4720164835453033},{"description":"fashion model","score":3.3732808232307434},{"description":"outerwear","score":3.368414909640948},{"description":"beauty","score":3.226946085691452},{"description":"cartoon","score":3.1411882142225904},{"description":"organ","score":3.116900712251663},{"description":"thigh","score":3.0000778681465556},{"description":"art","score":2.9005179653565087},{"description":"fictional character","score":2.8890988876422248},{"description":"vertebrate","score":2.861728181441625},{"description":"costume","score":2.841088227927685},{"description":"flower","score":2.789093229032698},{"description":"light","score":2.77453754345576},{"description":"standing","score":2.7744441472348713},{"description":"human behavior","score":2.708076931890987},{"description":"professional","score":2.6980796605348587},{"description":"symmetry","score":2.6448426047960916},{"description":"face","score":2.644425645470619},{"description":"hair coloring","score":2.628440648317337},{"description":"clothing","score":2.5839680075645446},{"description":"couch","score":2.45466148853302},{"description":"ecosystem","score":2.434485624233882},{"description":"atmosphere","score":2.4118474572896957},{"description":"chin","score":2.411084587375323},{"description":"indoor games and sports","score":2.3377464711666107},{"description":"male","score":2.287134140729904},{"description":"nose","score":2.244172091285388},{"description":"cool","score":2.173367842085778},{"description":"forehead","score":2.1482011477152505},{"description":"eye","score":2.1011888451046414},{"description":"black","score":2.0642906030019126},{"description":"vacation","score":2.05724240342776},{"description":"residential area","score":2.0142129957675934},{"description":"orange","score":1.928581565618515},{"description":"window","score":1.9137541637534188},{"description":"communication","score":1.9096966023956026},{"description":"dress","score":1.9033297280470531},{"description":"lilac","score":1.8700335969527564},{"description":"playground","score":1.8109857042630513},{"description":"conversation","score":1.7783667062010085},{"description":"architecture","score":1.745491494735082},{"description":"public space","score":1.7438673377037048},{"description":"real estate","score":1.6967481176058452},{"description":"night","score":1.6902980705102286},{"description":"atmosphere of earth","score":1.6605739444494247},{"description":"desk","score":1.6466815024614334},{"description":"darkness","score":1.6308820843696594},{"description":"property","score":1.6207989752292633},{"description":"pc game","score":1.6154424250125885},{"description":"bed","score":1.6113015040755272},{"description":"white","score":1.5638990104198456},{"description":"facial hair","score":1.559393326441447},{"description":"boy","score":1.538596491018931},{"description":"model","score":1.5315642654895782},{"description":"hand","score":1.5195032589965396},{"description":"facial expression","score":1.506481306420432},{"description":"vision care","score":1.4594984948635101},{"description":"logo","score":1.4429919670025506},{"description":"tights","score":1.4210360646247864},{"description":"eyebrow","score":1.4006562232971191},{"description":"reflection","score":1.379946529865265},{"description":"emotion","score":1.368066430091858},{"description":"lighting","score":1.3650689125061035},{"description":"world","score":1.3304588993390403},{"description":"formal wear","score":1.2793309340874353},{"description":"man","score":1.2452195882797241},{"description":"textile","score":1.2150780459245047},{"description":"barbie","score":1.1550514996051788},{"description":"abdomen","score":1.154850721359253},{"description":"lawn","score":1.1452609101931255},{"description":"blond","score":1.1410853415727615},{"description":"cottage","score":1.093623399734497},{"description":"mammal","score":1.0791844427585602},{"description":"outdoor play equipment","score":1.0791697104771931},{"description":"comfort","score":1.066619336605072},{"description":"photography","score":1.0529383420944214},{"description":"angle","score":1.0525755385557811},{"description":"estate","score":1.0141444404919941},{"description":"chair","score":0.9992034137248993},{"description":"happiness","score":0.9942301412423452},{"description":"energy","score":0.9624592065811157},{"description":"vegetation","score":0.9454419612884521},{"description":"waterway","score":0.9350039958953857},{"description":"water resources","score":0.9319664239883423},{"description":"biome","score":0.9299151996771494},{"description":"sitting","score":0.9273839995974587},{"description":"gentleman","score":0.9266372323036194},{"description":"landscape","score":0.9227438370386759},{"description":"electric blue","score":0.9161630868911743},{"description":"nature reserve","score":0.915196418762207},{"description":"watercourse","score":0.9056568145751953},{"description":"moon","score":0.8980846405029297},{"description":"jeans","score":0.8965819776058197},{"description":"peach","score":0.8961462676525116},{"description":"brown","score":0.8878261744976044},{"description":"finger","score":0.8819902704821692},{"description":"phenomenon","score":0.8805590669314066},{"description":"black and white","score":0.8671024044354756},{"description":"pond","score":0.8633843660354614},{"description":"drawing","score":0.8596483469009399},{"description":"wood flooring","score":0.8586359620094299},{"description":"wood","score":0.8509111404418945},{"description":"amusement park","score":0.8457686305046082},{"description":"hardwood","score":0.8400231599807739},{"description":"area","score":0.8400119841098785},{"description":"structure","score":0.837493360042572},{"description":"waist","score":0.8250214457511902},{"description":"profession","score":0.8161942362785339},{"description":"catwalk","score":0.8149630427360535},{"description":"astronomical object","score":0.8116787075996399},{"description":"ear","score":0.8074166973431905},{"description":"electronic device","score":0.8003376097906203},{"description":"figurine","score":0.788486659526825},{"description":"latex clothing","score":0.787390410900116},{"description":"nap","score":0.7873759269714355},{"description":"morning","score":0.785826563835144},{"description":"outer space","score":0.7847021818161011},{"description":"glasses","score":0.7674964070320129},{"description":"space","score":0.7634002268314362},{"description":"azure","score":0.7586549917856852},{"description":"cg artwork","score":0.7574576834837595},{"description":"haute couture","score":0.7431465983390808},{"description":"headgear","score":0.7355994681517284},{"description":"jungle","score":0.7319173514842987},{"description":"neighbourhood","score":0.7194759647051494},{"description":"rural area","score":0.7100904583930969},{"description":"laminate flooring","score":0.7095159888267517},{"description":"shoe","score":0.6958982348442078},{"description":"suit","score":0.692688375711441},{"description":"figure drawing","score":0.686222493648529},{"description":"teal","score":0.6853797038396199},{"description":"supermodel","score":0.683678388595581},{"description":"album cover","score":0.6831588745117188},{"description":"calligraphy","score":0.6766476432482402},{"description":"field","score":0.6732444167137146},{"description":"mansion","score":0.6713367104530334},{"description":"daytime","score":0.6706464141607285},{"description":"sleep","score":0.6591960191726685},{"description":"eyewear","score":0.6525739133358002},{"description":"suburb","score":0.6524470448493958},{"description":"anime","score":0.6517727043893602},{"description":"wall","score":0.6464475591977437},{"description":"cloud","score":0.6447527557611465},{"description":"music","score":0.6430685818195343},{"description":"art paper","score":0.6386047601699829},{"description":"audio equipment","score":0.6258530418078104},{"description":"brand","score":0.6234415769577026},{"description":"fetish model","score":0.621545672416687},{"description":"paper","score":0.615459680557251},{"description":"fiction","score":0.6125083821160453},{"description":"leggings","score":0.608989953994751},{"description":"hip","score":0.6080641150474548},{"description":"service","score":0.6036080121994019},{"description":"heat","score":0.6025663912296295},{"description":"music artist","score":0.5913708209991455},{"description":"physician","score":0.5864160656929016},{"description":"close up","score":0.5745373517274857},{"description":"nursery","score":0.5733510255813599},{"description":"plant stem","score":0.5675367712974548},{"description":"medical assistant","score":0.5646320581436157},{"description":"handwriting","score":0.5604924162228903},{"description":"audio","score":0.5596069310392653},{"description":"physician assistant","score":0.5448310971260071},{"description":"sofa bed","score":0.5417194366455078},{"description":"fashion design","score":0.5417128801345825},{"description":"fashion accessory","score":0.5399768650531769},{"description":"material","score":0.5367191079117003},{"description":"human leg","score":0.5303413271903992},{"description":"session musician","score":0.5164120197296143},{"description":"petal","score":0.5131025612354279},{"description":"stethoscope","score":0.5068091750144958},{"description":"interior designer","score":0.5001691579818726},{"description":"ceremony","score":0.49305240313212073},{"description":"maroon","score":0.48855969309806824},{"description":"bedroom","score":0.4827902391552925},{"description":"floristry","score":0.4824151794115702},{"description":"vehicle","score":0.4618988196055095},{"description":"garden","score":0.4584323217471441},{"description":"event","score":0.45451458295186364},{"description":"board game","score":0.44885021448135376},{"description":"plaid","score":0.4472893476486206},{"description":"sunlight","score":0.44312624136606854},{"description":"woody plant","score":0.43920445442199707},{"description":"cumulus","score":0.43906089663505554},{"description":"white collar worker","score":0.43856555223464966},{"description":"sports","score":0.4286178946495056},{"description":"grass family","score":0.4213157892227173},{"description":"gun","score":0.42015546560287476},{"description":"athletics","score":0.41951707005500793},{"description":"piano","score":0.41931918263435364},{"description":"lavender","score":0.41920748353004456},{"description":"dawn","score":0.41708114743232727},{"description":"doll","score":0.4106030762195587},{"description":"wetland","score":0.41037970781326294},{"description":"mannequin","score":0.4076200524965922},{"description":"icicle","score":0.4039674997329712},{"description":"chess","score":0.4030839502811432},{"description":"trunk","score":0.40042688449223834},{"description":"player","score":0.3961041271686554},{"description":"race","score":0.3933849036693573},{"description":"painting","score":0.3927994668483734},{"description":"sports training","score":0.3916485011577606},{"description":"bank","score":0.38863474130630493},{"description":"mixed use","score":0.3839554488658905},{"description":"lake","score":0.38349124789237976},{"description":"outdoor structure","score":0.38003341356913245},{"description":"firearm","score":0.37825509905815125},{"description":"running","score":0.3730296492576599},{"description":"tabletop game","score":0.37210649251937866},{"description":"performance","score":0.3703337609767914},{"description":"kindergarten","score":0.3689202070236206},{"description":"wing","score":0.3681829273700714},{"description":"learning","score":0.36574625968933105},{"description":"cheek","score":0.36355451246102655},{"description":"horizon","score":0.3630571961402893},{"description":"hair accessory","score":0.3604071040948232},{"description":"meteorological phenomenon","score":0.3599022626876831},{"description":"fast food","score":0.35787051916122437},{"description":"keyboard","score":0.35659322142601013},{"description":"competition event","score":0.3558432459831238},{"description":"human body","score":0.3529411270504906},{"description":"farm","score":0.3529382050037384},{"description":"infant","score":0.3524645268917084},{"description":"lip","score":0.35016483068466187},{"description":"institution","score":0.3432658910751343},{"description":"musical instrument","score":0.3429962694644928},{"description":"countertop","score":0.340228408575058},{"description":"cuisine","score":0.3372449278831482},{"description":"musician","score":0.32669368386268616},{"description":"flame","score":0.3249536454677582},{"description":"tradition","score":0.3205796778202057},{"description":"photograph","score":0.3199514150619507},{"description":"curtain","score":0.31507742404937744},{"description":"meadow","score":0.31238216161727905},{"description":"kitchen","score":0.3097842186689377},{"description":"sound","score":0.30912405252456665},{"description":"barechestedness","score":0.30875613292058307},{"description":"shelving","score":0.3043033281962077},{"description":"swimming pool","score":0.30365256468455},{"description":"ice","score":0.2960444688796997},{"description":"shelf","score":0.29476505517959595},{"description":"friendship","score":0.2939629753430684},{"description":"ceiling","score":0.29307347536087036},{"description":"shooting range","score":0.28804218769073486},{"description":"daylighting","score":0.28405797481536865},{"description":"sunglasses","score":0.28289902210235596},{"description":"cobalt blue","score":0.27938665946324664},{"description":"food","score":0.2790296673774719},{"description":"hug","score":0.2757704257965088},{"description":"electronic instrument","score":0.27424636483192444},{"description":"living room","score":0.2712262272834778},{"description":"plumbing fixture","score":0.2705652713775635},{"description":"stage","score":0.26948070526123047},{"description":"physical fitness","score":0.26794323325157166},{"description":"tattoo","score":0.2636539340019226},{"description":"writing","score":0.2624717652797699},{"description":"shadow","score":0.26203349232673645},{"description":"chest","score":0.26187630494435626},{"description":"flora","score":0.256682813167572},{"description":"circle","score":0.2561227083206177},{"description":"pool","score":0.24659653504689535},{"description":"cue stick","score":0.23860768477121988},{"description":"sea","score":0.23511976997057596},{"description":"leisure centre","score":0.23509450753529867},{"description":"balloon","score":0.23498366276423135},{"description":"restaurant","score":0.23476717869440714},{"description":"tartan","score":0.2347606897354126},{"description":"t shirt","score":0.23081435759862265},{"description":"grassland","score":0.2293698787689209},{"description":"back","score":0.22813590367635092},{"description":"city","score":0.2277201016743978},{"description":"summer","score":0.22104265292485556},{"description":"red hair","score":0.2189750075340271},{"description":"organism","score":0.20580428838729858},{"description":"monochrome","score":0.20307584603627524},{"description":"car","score":0.19669115543365479},{"description":"motor vehicle","score":0.19501622915267944},{"description":"yard","score":0.19334404170513153},{"description":"modern art","score":0.18993377685546875},{"description":"hearing","score":0.18168322245279947},{"description":"swimwear","score":0.18011687199274698},{"description":"vehicle door","score":0.17964161634445192},{"description":"mode of transport","score":0.175041127204895},{"description":"eyelash","score":0.17469497521718344},{"description":"mangaka","score":0.16873670948876274},{"description":"family car","score":0.16633281707763672},{"description":"automotive design","score":0.1643911361694336},{"description":"fishing rod","score":0.15779785315195718},{"description":"wig","score":0.15331146121025085},{"description":"fishing","score":0.15316287676493326},{"description":"casting fishing","score":0.15095611413319907},{"description":"angling","score":0.1442741552988688},{"description":"city car","score":0.14414750337600707},{"description":"public relations","score":0.13860063254833221},{"description":"temporary tattoo","score":0.13696200648943582},{"description":"full size car","score":0.13248902559280396},{"description":"water feature","score":0.1299921671549479},{"description":"bangs","score":0.12783721089363098},{"description":"recreational fishing","score":0.12190195918083191},{"description":"thumb","score":0.11467759476767646},{"description":"cap","score":0.11365036169687907},{"description":"undergarment","score":0.11082269748051961},{"description":"mehndi","score":0.11031235257784526},{"description":"henna","score":0.10703564683596294},{"description":"woman","score":0.1068158811993069},{"description":"costume design","score":0.1056170105934143},{"description":"bed sheet","score":0.10487782210111618},{"description":"evening","score":0.0982164740562439},{"description":"tourism","score":0.09278998772303264},{"description":"gadget","score":0.07447128636496407}];
var dataGirl = {"description":"girl","start_time":1505258232,"end_time":1505258232,"duration":3600,"scores":[0.3103986974217789,0.3043073677772273,0.3056642196841852,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.3015652932635881,0.2984250827212122,0.2984250827212122,0.29814622364928567,0.29244966174160675,0.29244966174160675,0.29842197893151323,0.31295996271113236,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};

app.use(express.static(__dirname + '/Views'));
app.set('views', path.join(__dirname, '/Views'));
app.use('/Scripts', express.static('Scripts'));
app.use('/JSON', express.static('JSON'));
app.use('/Styles', express.static('Styles'));

app.set('view engine', 'pug');

var startTime = 1505420041
	, endTime = 1505424001;

var databaseUrl = "http://10.14.41.30:8081/label/";

/*
 * Route
 */
app.get('/', function (req, res) {
	res.sendFile('index.html');
})


var data = new EventEmitter();

app.get('/data', function (req, res) {

	request.post({
		headers: {'content-type' : 'application/json; charset=utf-8'},
		url: 'http://10.14.41.30:8081/api/labels/top',
		json: true,
		body: {
			"start_time": 1505258232,
			"end_time": 1505517432
		}
	}, function(err, r, body) {
		data.labels = parseJSONArray(body);
		data.emit('update');

		request.post({
			headers: {'content-type' : 'application/json; charset=utf-8'},
			url: 'http://10.14.41.30:8081/api/labels/time',
			json: true,
			body: {
				"start_time": 1505258232,
				"end_time": 1505517432,
				"duration": 3600,
				"label": "tree"
			}
		}, function(err, r, body) {
			data.label = parseJSONObject(body);
			data.emit('update');

			res.render('index', {
				title: 'Tada Data',
				message: 'Tada Active Database Analysis',
				data: data.labels,
				data2: data.label
			})
		})
	})
})

/*
 * Request tag popularity
 */
request.post({
	headers: {'content-type' : 'application/json; charset=utf-8'},
	url: 'http://10.14.41.30:8081/api/labels/time',
	json: true,
	body: {
		"start_time": 1505258232,
		"end_time": 1505517432,
		"duration": 3600,
		"label": "text"
	}
}, function(err, res, body) {
	// console.log(body);
})

/*
 * Express app
 */
app.listen(process.env.PORT || 3000, function(){
  console.log("Tada server listening on port %d in %s mode", this.address().port, app.settings.env);
});

/*
 * Parse JSON array to Google data rows
 */
var parseJSONArray = function(data) {
	var rows = [];
	data.forEach(function(d) {
		var row = [];
		row.push(d.description);
		row.push(d.score);
		rows.push(row);
	})

	return rows;
}

/*
 * Parse JSON object to Google data rows
 */
var parseJSONObject = function(data) {
	var rows = [];
	var description = data.description,
		startTime = data.start_time,
		endTime = data.end_time,
		duration = data.duration,
		scores = data.scores.reverse();
	var i = 1;
	scores.forEach(function(s) {
		var row = [];
		row.push(i);
		row.push(s);
		rows.push(row);
		i++;
	})

	return rows;
}
