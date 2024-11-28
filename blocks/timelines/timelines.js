export default function decorate(block) {

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry=>{
            if(entry.isIntersecting === true){
                entry?.target?.classList?.remove("invisible");
                entry?.target?.classList?.add("visible");
            }else if(entry.isIntersecting === false && window.scrollY < entry.target.getBoundingClientRect().top + window.scrollY){
                entry?.target?.classList?.remove("visible");
                entry?.target?.classList?.add("invisible");
            }
        })
    }, { threshold: [0.40] });

    //o primeiro elemento será sempre a propriedade startAt
    const startAtElement = block?.children[0]
    const startAtValue = startAtElement.firstElementChild.firstElementChild.innerHTML

    //removendo do DOM pois é apenas uma propriedade, 
    startAtElement.remove()
    let i = startAtValue === "right" ? 0 : 1

    for (const child of block?.children) {
        if(i % 2 === 0)
            child.className = 'timeline-item timeline-right invisible'
        else
            child.className = 'timeline-item timeline-left invisible'

        const title = child?.children[0]
        const subtitle = child?.children[1]
        const text = child?.children[2]
        const image = child?.children[3]
        const imgTitle = child?.children[4]
        const imgSource = child?.children[5]

        const text2 = child?.children[6]
        const image2 = child?.children[7]
        const imgTitle2 = child?.children[8]
        const imgSource2 = child?.children[9]

        title.className = "timeline-item-title"
        subtitle.className = "timeline-item-subtitle"

        text.className = "timeline-item-text"
        image.className="timeline-item-image"
        imgTitle.className="timeline-item-image-title"
        imgSource.className="timeline-item-image-source"

        text2.className = "timeline-item-text"
        image2.className="timeline-item-image"
        imgTitle2.className="timeline-item-image-title"
        imgSource2.className="timeline-item-image-source"
        
        let timelineItemWrapper = document.createElement("div")
        timelineItemWrapper.className = "timeline-item-wrapper"
        
        let timelineItemHeader = document.createElement("div")
        timelineItemHeader.className = "timeline-item-header"
        timelineItemHeader.appendChild(title)

        let timelineItemImageWrapper = document.createElement("div")
        timelineItemImageWrapper.className = "timeline-item-image-wrapper"
        timelineItemImageWrapper.appendChild(imgTitle)
        timelineItemImageWrapper.appendChild(image)
        timelineItemImageWrapper.appendChild(imgSource)

        let timelineItemImageWrapper2 = document.createElement("div")
        timelineItemImageWrapper2.className = "timeline-item-image-wrapper"
        timelineItemImageWrapper2.appendChild(imgTitle2)
        timelineItemImageWrapper2.appendChild(image2)
        timelineItemImageWrapper2.appendChild(imgSource2)


        let timelineItemContent = document.createElement("div")
        timelineItemContent.className = "timeline-item-content"
        timelineItemContent.appendChild(subtitle)
        timelineItemContent.appendChild(text)

        if(image.innerHTML)
            timelineItemContent.appendChild(timelineItemImageWrapper);


        timelineItemContent.appendChild(text2)

        if(image2.innerHTML)
            timelineItemContent.appendChild(timelineItemImageWrapper2);

        timelineItemWrapper.appendChild(timelineItemHeader)
        timelineItemWrapper.appendChild(timelineItemContent)




        child.appendChild(timelineItemWrapper);

        observer.observe(child);
        i++
    }    
}
