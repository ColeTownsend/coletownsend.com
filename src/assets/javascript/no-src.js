var elems = document.getElementsByTagName('*');
for(var i=0;i < elems.length;i++){
    var retina = (window.devicePixelRatio >= 1.2)? elems[i].getAttribute('data-2x') : elems[i].getAttribute('data-src');
    var small = (window.innerWidth < 641)? elems[i].getAttribute('data-small') : elems[i].getAttribute('data-src');
    // retina
    if(retina && elems[i].tagName == 'IMG'){
        elems[i].src = retina;
    }
    else if(retina){
        elems[i].style.cssText += 'background-image: url('+retina+')';
    }
    // small
    else if(small && elems[i].tagName == 'IMG') {
      elems[i].src = small;
    }
    else if(small){
        elems[i].style.cssText += 'background-image: url('+small+')';
    }
    else if(small && retina && elems[i].tagName == 'IMG' ) {
      elems[i].style.cssText += 'background-image: url('+small+')';
    }
}
