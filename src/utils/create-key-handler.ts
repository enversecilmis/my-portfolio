import { KeyboardEvent, KeyboardEventHandler } from "react"

export type Keys =
	"Backspace" |
	"Tab" |
	"Enter" |
	"Shift" |
	"Shift" |
	"Control" |
	"Control" |
	"Alt" |
	"Alt" |
	"Pause" |
	"CapsLock" |
	"Escape" |
	" " |
	"PageUp" |
	"PageDown" |
	"End" |
	"Home" |
	"ArrowLeft" |
	"ArrowUp" |
	"ArrowRight" |
	"ArrowDown" |
	"PrintScreen" |
	"Insert" |
	"Delete" |
	"0" |
	"1" |
	"2" |
	"3" |
	"4" |
	"5" |
	"6" |
	"7" |
	"8" |
	"9" |
	"a" |
	"b" |
	"c" |
	"d" |
	"e" |
	"f" |
	"g" |
	"h" |
	"i" |
	"j" |
	"k" |
	"l" |
	"m" |
	"n" |
	"o" |
	"p" |
	"q" |
	"r" |
	"s" |
	"t" |
	"u" |
	"v" |
	"w" |
	"x" |
	"y" |
	"z" |
	"Meta" |
	"Meta" |
	"ContextMenu" |
	"0" |
	"1" |
	"2" |
	"3" |
	"4" |
	"5" |
	"6" |
	"7" |
	"8" |
	"9" |
	"*" |
	"+" |
	"-" |
	"." |
	"/" |
	"F1" |
	"F2" |
	"F3" |
	"F4" |
	"F5" |
	"F6" |
	"F7" |
	"F8" |
	"F9" |
	"F10" |
	"F11" |
	"F12" |
	"NumLock" |
	"ScrollLock" |
	"AudioVolumeMute" |
	"AudioVolumeDown" |
	"AudioVolumeUp" |
	"LaunchMediaPlayer" |
	"LaunchApplication1" |
	"LaunchApplication2" |
	";" |
	"=" |
	" |" |
	"-" |
	"." |
	"/" |
	"`" |
	"[" |
	"\\" |
	"]" |
	"'"


export type ExtendedKeyboardEventHandler<T = Element> = (event: KeyboardEvent<T>, stopParent: () => void) => void

export type KeyHandlers<T> = {
	[key in Keys]?: ExtendedKeyboardEventHandler<T>
} & {
	parentKeyHandler?: KeyboardEventHandler<T>
}

export type CreateKeyHandler = <T extends Element = HTMLInputElement>(handlers: KeyHandlers<T>) => KeyboardEventHandler<T>

export const createKeyHandler: CreateKeyHandler = (handlers) => {
	let parentStopped = false
	const stopParent = () => parentStopped = true
	const parentKeyHandler = handlers["parentKeyHandler"]

	return (e) => {
		const handler = handlers[e.key as Keys]

		handler?.(e, stopParent)
		!parentStopped && parentKeyHandler?.(e)
		parentStopped = false
	}
}