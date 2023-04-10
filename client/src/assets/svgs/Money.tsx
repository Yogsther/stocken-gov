interface MoneyProps {
    color: string
}
export default function Money({color}: MoneyProps) {
    return <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 96 960 960" fill={color}><path d="M483 947q-16 0-26-9.5T447 912v-51q-52-9-86.5-36.5T306 756q-7-15 1-31.5t25-23.5q14-5 29 1t26 22q17 30 44 44t58 14q45 0 71.5-20.5T587 706q0-39-28-62.5T456 597q-70-21-106.5-62.5T313 433q0-52 33-92.5T447 290v-50q0-16 10-25.5t26-9.5q15 0 25 9.5t10 25.5v50q35 7 65.5 24t50.5 46q9 14 3 30t-23 23q-13 6-28 1.5T556 396q-13-14-32-21.5t-43-7.5q-41 0-63 16.5T396 430q0 32 24 53.5T529 531q70 23 105.5 64.5T670 702q0 66-38.5 107T518 862v50q0 16-10 25.5t-25 9.5Z"/></svg>
}