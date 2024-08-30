export default function decorate(block) {
    console.log(block.children)
    let i=0;
    for (const child of block.children) {
        if(i % 2 === 0)
            child.className = 'timeline-right'
        else
            child.className = 'timeline-left'

        i++
    }
}
