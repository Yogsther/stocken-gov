import React from "react"
import './SignableField.css'
import ThemeContextProvider, { Theme, useTheme } from "../../contexts/ThemeContext"

interface SignableFieldProps {
    setHasBeenSigned: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignableField({ setHasBeenSigned }: SignableFieldProps) {
    let canvasRef = React.useRef<HTMLCanvasElement>(null)

    let mouseDown = false
    let lastMousePosition: any = null
    let drawn_frames = 0

    function getMousePosition(e: MouseEvent): { x: number, y: number } {
        let canvas = canvasRef.current
        if (canvas) {
            let rect = canvas.getBoundingClientRect()
            let x = e.clientX - rect.left
            let y = e.clientY - rect.top
            return { x, y }
        } else {
            return { x: 0, y: 0 }
        }
    }

    function handleMouseDown(e: MouseEvent) {
        mouseDown = true
        let color = getComputedStyle(document.documentElement).getPropertyValue('--text')


        if (canvasRef.current) {
            let canvas = canvasRef.current
            let ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.lineWidth = 5
                ctx.strokeStyle = color
                ctx.beginPath()
                let mousePosition = getMousePosition(e)
                ctx.moveTo(mousePosition.x, mousePosition.y)
            }
        }
    }

    function handleMouseUp(e: MouseEvent) {
        mouseDown = false
    }

    function handleMouseMove(e: MouseEvent) {
        if (mouseDown) {
            if (canvasRef.current) {
                let canvas = canvasRef.current
                let ctx = canvas.getContext('2d')
                if (ctx) {

                    drawn_frames++;
                    if (drawn_frames > 25) {
                        setHasBeenSigned(true)
                    }
                    let mousePosition = getMousePosition(e)
                    ctx.lineTo(mousePosition.x, mousePosition.y)
                    ctx.stroke()
                }
            }
        }
    }

    React.useEffect(() => {
        if (canvasRef.current) {
            let canvas = canvasRef.current
            canvas.addEventListener('mousedown', handleMouseDown)
            canvas.addEventListener('mouseup', handleMouseUp)
            canvas.addEventListener('mousemove', handleMouseMove)
        }
    }, [])


    return (
        <canvas
            id='signable-field'
            width='600'
            height='150'
            ref={canvasRef}
        />
    )

}