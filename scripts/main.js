var open = true; //to manage the status of the .top-nav

$(document).ready(function() {
	
    //Manages top menu bar
    checkWinSize();
	
    $('.slider').draggable({
        axis: 'x',
        scroll: "false",
        containment: ".slider-track",
        cursor: 'grab',
		drag: function(event, ui) {
			var draggableWidth = ui.helper.width();
			var timelineWidth = $('.visited').width();
			console.log(timelineWidth);
		}
    })
    
	$('.expand').click(toggleMenu);
    $(window).on('resize', checkWinSize);
		
	var startTime = (new Date).getTime();
	
	//maxResults must be Math.pow(2, 31), because the requirement is
	//a 32 bit unsigned integer.
	chrome.history.search({
		text: '', 
		//time since Unix epoch - 48 hours(1000ms * 60s * 60m * 24h * 2d)
		startTime: (new Date()).getTime() - 1000 * 60 * 60 * 24 * 2, 
		maxResults: getLargestIntOfSize(31),
	}, function(results) {
		
		//variable to hold domain objects
		var domains = {};
		
		//grouping domain names
		for(let i in results) {
		
			var domainKeys = Object.keys(domains);
			var currDomain = extractSiteName(results[i].url);
			var currDomain_plain = currDomain.split('.').join('');
			var currDomainIndexExists = domainKeys.indexOf(currDomain_plain) > -1;
			
			if(!currDomainIndexExists) {
				
				for(let j in domainKeys) {
					
					if(domainKeys[j].indexOf(currDomain_plain) > -1) {
						
						currDomainIndexExists = true;
						
						break;
					
					
					}
				
				}
			}
			if(!currDomainIndexExists) {
			
				domains[currDomain_plain] = {
					'url': results[i].url,
					'domain': currDomain,
				}
			
			}
			
		} //end of domain grouping
		
		console.log(domains);
		
	});
	
});

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

//.top-nav display functions
function toggleMenu() {
	
    $('.collapsible').css('display', open ? 'block' : 'none');
    $('.collapsible > *').css('display', open ? 'block': 'none');
    
	open = !open;

}

//check if window is large enough to fit certain UI elements.
function checkWinSize() {

	var bool = window.innerWidth < 1100;
    
	$('.expand').css('display', bool ? 'inline' : 'none');
    $('#menu-icon').css('display', bool ? 'inline' : 'none');
    $('.collapsible').css('display', bool ? 'none' : 'inline');
    $('.collapsible > *').css('display', bool ? 'none' : 'inline');

}

//function to get largest unsigned integer of a certain length
//Takes 1 argument (number of bits)
function getLargestIntOfSize(bits) {
	
	var nums = 0;
	
	for(let i = 0; i < bits; i++) nums += Math.pow(2, i);
	
	return nums;

}