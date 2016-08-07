var open = true; //to manage the status of the .top-nav
var domains = {};//variable to hold domain objects
var sliderDistPercentage;

$(document).ready(function() {
	
    //Manages top menu bar
    checkWinSize();
	
	var startDistance, stopDistance;
	sliderDistPercentage = getSliderDistPercent();
	
	$('.slider').draggable({
        axis: 'x',
        scroll: "false",
        containment: ".slider-container",
        cursor: 'grab',
		start: function(event, ui) {
			startDistance = ui.position.left;
		},
		drag: function(event, ui) {
			sliderDistPercentage = roundNearestPercent(getSliderDistPercent());
			
			var timelineWidth = getMaxScrollVal($('.timeline'));
			
			$('.timeline').scrollLeft(timelineWidth * sliderDistPercentage);
			
		}
    });
    
	$('.expand').click(toggleMenu);
	
    $(window).on('resize', checkWinSize);
	
	/* 
	 * this code is exclusive to resize
	 * checkWinSize is called onload, thus making 
	 * this a better way to handle redrawing 
	 * the slider component
	 */
	$(window).on('resize', function() {
		//also represents width of the area for the slider
		var farthestPos = $('.slider-container').width() - $('.slider').width();
		var newSliderPos = farthestPos * sliderDistPercentage;
		
		$('.slider').css({
			'left': newSliderPos
		});
		
	});
	
	//maxResults must be Math.pow(2, 31), because the requirement is
	//a 32 bit unsigned integer.
	chrome.history.search({
		text: '', 
		//time since Unix epoch - 48 hours(1000ms * 60s * 60m * 24h * 2d)
		startTime: (new Date()).getTime() - 1000 * 60 * 60 * 24 * 2, 
		//only takes a 32 bit signed integer 
		//(Math.pow(2, 32) is not the same as 01111111111111111111111111111111 
		//in binary)
		maxResults: getLargestIntOfSize(31),
	}, function(results) {
		
		//grouping domain names
		for(let i in results) {
		
			var domainKeys = Object.keys(domains);
			var currDomain = extractSiteName(results[i].url);
			var currDomainIndex = currDomain;
			var currDomain_plain = currDomain.split('.').join('');
			var currDomainIndexExists = domainKeys.indexOf(currDomain_plain) > -1;
			
			if(!currDomainIndexExists) {
				
				for(let j in domainKeys) {
					
					if(domainKeys[j].indexOf(currDomain_plain) > -1) {
						
						currDomainIndexExists = true;
						currDomainIndex = domainKeys[j];
						
						break;
					
					
					}
				
				}
				
			}
			if(!currDomainIndexExists) {
			
				domains[currDomainIndex] = {
					'urls': [results[i].url],
					'domain': currDomain,
				}
			
			} else {
				
				domains[currDomainIndex].urls.push(results[i].url);
				
			}
			
		} //end of domain grouping
		
		var domainKeys = Object.keys(domains);
		
		//get favicon urls. Seperate from domain grouping
		//for understandability. Keep it that way.
		for(let i in domainKeys) {
			
			domains[domainKeys[i]].favicon = "chrome://favicon/" +
				domains[domainKeys[i]].urls[0];
			
		}
		
	});
	
}); //end of $(document).ready();

function getMaxScrollVal(element) {
	var currScroll = element.scrollLeft();
	element.scrollLeft(getLargestIntOfSize(31));
	var maxScrollVal = element.scrollLeft();
	element.scrollLeft(currScroll);
	return maxScrollVal;
}
function getSliderDistPercent() {
	var sliderPos = getPosAsInt($('.slider').css('left'), 'px');
	var farthestPos = $('.slider-container').width() - $('.slider').width();
	
	return sliderPos / farthestPos;
}

function extractSiteName(url) {
	
	var domain = extractDomain(url)
	
	//remove http(s)://(www.)
	if(domain.indexOf('www.') > -1) {
	
		domain = domain.slice(domain.indexOf('.') + 1);
	
	}
	
	return domain;

}

//extract domain name from string. Props to lewdev at stackoverflow for this.
function extractDomain(url) {
    
	var domain;
    
	//find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
    
		domain = url.split('/')[2];
    
	} else {
     
		domain = url.split('/')[0];
    
	}
    
	return domain;

}

//get date object from milliseconds since epoch
function getDate(milliseconds) {
	
	return new Date(milliseconds);

}

//.top-nav display functions
function toggleMenu() {
	
	console.log("toggleMenu");
	
    $('.collapsible').css('display', open ? 'block' : 'none');
    $('.collapsible > *').css('display', open ? 'block': 'none');
    
	open = !open;

}

//check if window is large enough to fit certain UI elements.
function checkWinSize() { //also properly redraws the slider.
	//for some reason, the slider doesn't retain good form
	// (but it does when you refresh, given that this code doesn't exist)
	
	console.log('checkWinSize');
	setTimeout(function() {
		console.clear();
	}, 1);
	
	var bool = window.innerWidth <= 1100;
    
	$('.expand').css('display', bool ? 'inline' : 'none');
    $('#menu-icon').css('display', bool ? 'inline' : 'none');
    $('.collapsible').css('display', bool ? 'none' : 'inline');
    $('.collapsible > *').css('display', bool ? 'none' : 'inline');
}

function roundNearestPercent(value) {
	return Math.round(value * 100) / 100;
}

//removes "remove" from "str" and returns integer value
function getPosAsInt(str) {
	return parseInt(str.substr(0, str.length - 2));
}
//function to get largest unsigned integer of a certain length
//Takes 1 argument (number of bits)
function getLargestIntOfSize(bits) {
	
	var nums = 0;
	
	for(let i = 0; i < bits; i++) nums += Math.pow(2, i);
	
	return nums;

}