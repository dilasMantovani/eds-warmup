export default function decorate(block) {
    //o primeiro elemento será sempre a propriedade startAt
    const startAtElement = block?.children[0]
    const startAtValue = startAtElement.firstElementChild.firstElementChild.innerHTML

    //removendo do DOM pois é apenas uma propriedade, 
    startAtElement.remove()
    let i = startAtValue === "right" ? 0 : 1

    for (const child of block?.children) {
        if(i % 2 === 0)
            child.className = 'timeline-right'
        else
            child.className = 'timeline-left'

        const title = child?.children[0]
        const subtitle = child?.children[1]
        const text = child?.children[2]
        const image = child?.children[3]

        title.className = "timeline-item-title"
        subtitle.className = "timeline-item-subtitle"
        text.className = "timeline-item-text"
        image.className="timeline-item-image"
        
        let timelineItemWrapper = document.createElement("div")
        timelineItemWrapper.className = "timeline-item-wrapper"
        
        let timelineItemHeader = document.createElement("div")
        timelineItemHeader.className = "timeline-item-header"
        timelineItemHeader.appendChild(title)


        let timelineItemContent = document.createElement("div")
        timelineItemContent.className = "timeline-item-content"
        timelineItemContent.appendChild(subtitle)
        timelineItemContent.appendChild(text)
        timelineItemContent.appendChild(image)

        timelineItemWrapper.appendChild(timelineItemHeader)
        timelineItemWrapper.appendChild(timelineItemContent)



        child.appendChild(timelineItemWrapper);
        i++
    }
}
