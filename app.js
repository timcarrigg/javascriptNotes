console.log('sup');

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const outline = document.querySelector('.outline');
  const mainContent = document.querySelector('.main');
  const title = document.querySelector('.div-h1');
  const header = document.querySelector("header");

  menuToggle.addEventListener('change', function () {
    if (menuToggle.checked) {
      outline.style.display = 'block';
      mainContent.style.filter = 'brightness(30%)';
      header.style.filter = 'brightness(50%)';
    } else {
      outline.style.display = 'none';
      mainContent.style.filter = 'brightness(100%)';
      header.style.filter = 'brightness(100%)';
    }
  })






  function handleMouseover(event) {
    if (event.target.classList.contains('sidebar-mouseover-area')) {
      showOutline();
    }
  }

  const sidebar = document.getElementById('sidebar');
  sidebar.addEventListener('mouseover', handleMouseover)
  sidebar.addEventListener('mouseleave', closeSidebar)
  outline.addEventListener('transitionend', () => {
    setTimeout(() => sidebar.addEventListener('mouseover', handleMouseover), 200);
    console.log('TRANSITION HAS ENDED NOW!!!!!!!!!!!!!!!!!!!');
  })



  function showOutline() {
    outline.style.width = '350px';
    overOutline = 1;
    mainContent.style.filter = 'brightness(70%)';
    header.style.filter = 'brightness(80%)';
  }



  function closeSidebar(event, linkClick) {
    outline.style.width = '0px';
    mainContent.style.filter = 'brightness(100%)';
    header.style.filter = 'brightness(100%)';
    Array.from(document.querySelectorAll('#sidebar a')).forEach((el) => {
      el.classList.add('.disableHover');
      console.log(el.classList);
    });
    //event.target.style.color = '#d4b830';
    if (linkClick === true) {
      sidebar.removeEventListener('mouseover', handleMouseover)
    }
    console.log('STARTED TRANSITION!!!!!!!!!!!!!!!!!!!');
  }

  const chapters = document.getElementById('chapters')
  Array.from(chapters.children).forEach((el) => el.addEventListener('click', (event) => {
    closeSidebar(event, true)
  }))




  function mouseOverSidebar() {
    if (((overTab === 0) && (overDivider === 0)) && (overOutline === 0)) {
      outline.style.width = '0px';
      mainContent.style.filter = 'brightness(100%)';
      header.style.filter = 'brightness(100%)';
    }

  }

  //===========================================================================================================
  //===========================================================================================================



  function inViewport(entries) {    
    entries.forEach((entry) => {
      if (entry.isIntersecting === false) {
        console.log(entry.target.id + ' is leaving')
        return;
      }
      console.log(entry.target.id + ' is now in the viewport');
      //console.log('looking for: ' + entry.target.id);
      //console.log('looking for: ' + chapterLinks[0]);
      let foundMatch = 0;
      for (let i = 0; i < chapterLinks.length; i++) {
        let aElement = document.querySelector("a[href*=" + chapterLinks[i] + ']')
        if (foundMatch === 1) {
          if (aElement.classList.contains('gold'))
            aElement.classList.remove('gold');
          //aElement.classList.add('darkBlue') //SOMEHOW INSTEAD OF CHANGING COLORS DIRECTLY, ADD/REMOVE CLASS VALUES WHICH WILL CHANGE THE COLORS. THAT WAY, HOVER RETAINS THE ABILITY TO SET THE INLINE COLOR STYLE.
          //aElement.style.color = '#00000e';
          aElement.parentElement.style.backgroundColor = 'inherit';
          aElement.parentElement.style.border = 'inherit'
          continue;
        }
        //console.log('aElement: ' + aElement.href.match(/(#)[\s\S]*/g)[0].substring(1));
        //console.log('entryID: ' + entry.target.id);
        //console.log("match this: " + aElement.href.match(/(#)[\s\S]*/g)[0].substring(1))
        if ((aElement.href.match(/(#)[\s\S]*/g)[0].substring(1) + 'UL') != entry.target.id) {
          if (aElement.classList.contains('gold'))
            aElement.classList.remove('gold');
          //aElement.style.color = '#00000e';
          aElement.parentElement.style.backgroundColor = 'inherit';
          aElement.parentElement.style.border = 'inherit'
        } else {
          aElement.parentElement.style.backgroundColor = '#00000e';
          aElement.parentElement.style.border = '10px solid ##999aaa';
          aElement.classList.add('gold');
          //aElement.style.color = '#d4b830';
          foundMatch = 1;
          console.log('Found match!')
        }
      }
      
    })

  }


  const observer = new IntersectionObserver(inViewport, {
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px'
  })


  const chapterLinks = Array.from(document.querySelectorAll("a[href*='chapter'"));
  const chapterTargets = [];

  let ch13 = document.querySelector("[href='#chapter13']")

  console.log('ch13:');
  console.log(ch13.style); 

  for (let i = 0; i < chapterLinks.length; i++) {
    let linkEnd = chapterLinks[i].href.match(/(#)[\s\S]*/g)[0];
    chapterLinks[i] = linkEnd.substring(1);
    console.log('linkEnd:' + linkEnd)
    let chStart = document.querySelector(linkEnd + 'UL');
    console.log(chStart);
//    console.log(document.querySelector('#chapter0'));
    chapterTargets.push(chStart)
  }


  console.log(typeof chapterLinks[0]);
//  console.log(typeof chapterTargets[0].id);
  console.log('CHAPTER LINKS: ' + chapterLinks);
  console.log('NOW FOR THE CHAPTER TARFGETS:');
  console.log(chapterTargets);
  //chapterTargets.forEach((e) => Array.from(e.children).forEach((el)=>el.style.color='yellow'));

  chapterTargets.forEach((el) => observer.observe(el));









  //===========================================================================================================
  //===========================================================================================================

  /*document.querySelectorAll('li').forEach((el) => el.setAttribute('tabindex', '0'));
  document.querySelectorAll('li').forEach((el) => el.setAttrbitute('role', 'none'));
  });*/







}); /* <<<< don't fucking touch this. */