import React, { CSSProperties, useEffect, useState } from 'react'

interface AnimateMountProps {
	children: React.ReactNode
	willRender: boolean
	transition: Transition
	verbose?: boolean
}
export interface Transition {
	initial: CSSProperties
	transition: CSSProperties
	exit: CSSProperties
	duration: number
}
/**
 * TransitionLifecycle transitions between mount / unmount of its child components.
 * 
 * Props:
 * - children: the child component(s) to be transitioned
 * - willRender: the condition to determine if the child component(s) will be rendered
 * - transition: the transition properties to be applied to the child component(s)
 * - verbose: whether to log the transition properties to the console
 * 
 * Example:
 * 
 * <TransitionLifecycle
 *		willRender={true or false}
 *		transition={{
 *			initial: { opacity: 0, transform: 'translateY(-50px)' },
 *			transition: { opacity: 1, transform: 'translateY(0)' },
 *			exit: { opacity: 0, transform: 'translateY(50px)' },
 *			duration: 1000
 *		}}
 *	>
 *		<h1>Hello World</h1>
 *	</TransitionLifecycle>
 */
export default function TransitionLifecycle({ children, transition, willRender, verbose }: AnimateMountProps): JSX.Element {

	const [childrenMounted, setChildrenMounted] = useState<boolean>(false)
	const [transitioning, setTransitioning] = useState<boolean>(false)

	// Debug
	useEffect(() => {
		if (verbose) {
			if (childrenMounted) console.log('mounted.')
			else console.log('unmounted.')
		}
	}, [childrenMounted, verbose])

	// Debug
	useEffect(() => {
		if (verbose) {
			if (willRender) {
				console.log('transitioning in...')
				setTimeout(() => {
					console.log('transition done.')
				}, transition.duration)
			}
			else {
				console.log('transitioning out...')
				setTimeout(() => {
					console.log('transition done.')
				}, transition.duration)
			}
		}
	}, [willRender, transition.duration, verbose])

	useEffect(() => {
		if (transitioning) return
		if (willRender) {
			setChildrenMounted(true)
			setTransitioning(true)
			setTimeout(() => {
				setTransitioning(false)
			}, transition.duration)
		} else {
			setTransitioning(true)
			setTimeout(() => {
				setChildrenMounted(false)
				setTransitioning(false)
			}, transition.duration)
		}
	}, [willRender, transition.duration, transitioning])

	const getCurrentStyle = (): CSSProperties => {
		const transitionDuration: CSSProperties = { transitionDuration: transition.duration + 'ms' }

		if (!childrenMounted)
			return { ...transition.initial, ...transitionDuration }

		if (willRender)
			return { ...(transition.transition), ...transitionDuration }

		else
			return { ...(transition.exit), ...transitionDuration }
	}

	return (
		<div style={getCurrentStyle()}>
			{childrenMounted && children}
		</div>
	)
}
