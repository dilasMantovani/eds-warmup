export default function decorate(block) {
    let i=0;
    for (const child of block.children) {
        const title = child?.children[0]
        const subtitle = child?.children[1]
        const text = child?.children[2]
        const image = child?.children[3]
        
        title.className = "timeline-title"
        subtitle.className = "timeline-subtitle"
        text.className = "timeline-text"
        image.className="timeline-image"

        if(i % 2 === 0)
            child.className = 'timeline-right'
        else
            child.className = 'timeline-left'

        i++
    }
}
