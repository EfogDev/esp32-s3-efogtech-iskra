import { Component, h } from 'preact'
import style from './style.less'
import cn from 'classnames'
import { rgbFnBinding } from "../app.js"

const IskraIcon = () => (
	<img alt="" className={style.status} src="data:image/webp;base64,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" />
)

const StatusLabel = (props) => (
	<div onClick={props.onClick} className={cn(style.label, props.className)}>
		{props.text}
	</div>
)

const StatusTag = (props) => (
	<div className={cn(style.tag, props.className)}>
		<span>{props.name}:</span>
		<span>{props.value}</span>
	</div>
)

export class AnimationPicker extends Component {
	render() {
		const { value, onChange } = this.props

		return (
			<div className={style.pickerContainer}>
				<div role="color" className={style.pickerHint}>Animation</div>
				<div className={style.pickerSelector}>
					<select role="color" onChange={e => onChange && onChange(e.target.value)}>
						{Object.keys(rgbFnBinding).map((key) => (
							<option key={key} value={key} selected={value.toString() === key.toString()}>
								{rgbFnBinding[key]}
							</option>
						))}
					</select>
				</div>
			</div>
		)
	}
}

export class Slider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			percent: props.value,
		}

		this.ref = null
	}

	componentDidMount() {
		setTimeout(() => {
			this.repaint(this.state.percent)
		})
	}

	componentDidUpdate(previousProps, previousState, previousContext) {
		if (this.props.value !== this.state.percent && !this.state.active) {
			this.repaint(this.props.value)
		}
	}

	touch(e) {
		if (!e.touches || e.touches.length !== 1)
			return

		e.preventDefault()
		e.stopPropagation()

		const { pageX } = e.touches[0]
		const { x, width } = e.target.getBoundingClientRect();
		const percent = Math.round(Math.min(100, Math.max((pageX - x) * 100 / width, 0)))

		if (!this.state.percent || this.state.percent !== percent) {
			this.repaint(percent)
		}
	}

	repaint(percent) {
		if (this.ref) {
			this.ref.style.width = `${percent}%`

			if (percent >= 99) {
				this.ref.style.borderTopRightRadius = `6px`
				this.ref.style.borderBottomRightRadius = `6px`
			} else {
				this.ref.style.borderTopRightRadius = `0px`
				this.ref.style.borderBottomRightRadius = `0px`
			}
		}

		this.setState({ percent })
		this.props.onChange && this.props.onChange(percent)
	}

	render() {
		return (
			<div
				onTouchStart={e => this.setState({ active: true }, () => this.touch(e))}
				onTouchMove={e => this.touch(e)}
				onTouchEnd={() => this.setState({ active: false })}
				className={cn(style.slider, { [style.active]: this.state.active, [style.alt]: this.props.alt })}
			>
				<div className={style.sliderValue} ref={ref => (ref && !this.ref && (this.ref = ref))} />
				<div className={style.sliderText}>{this.props.name}: {this.state.percent}%</div>
			</div>
		)
	}
}

export default class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {
		window.emitter.on('refresh', () => {
			setTimeout(() => this.forceUpdate())
		})
	}

	changeBrightness(value) {
		window.emitter.emit('send', `rgb_power ${value}`, true)
		window.emitter.emit('update', { brightness: value, isLoading: true })
	}

	changeSpeed(value) {
		window.emitter.emit('send', `rgb_speed ${value}`, true)
		window.emitter.emit('update', { speed: value, isLoading: true })
	}

	setRgbFn(value) {
		window.emitter.emit('send', `rgb_fn ${value}`, true)
		window.emitter.emit('update', { rgbCurrentFn: value, isLoading: true })

		try { navigator.vibrate(60) } catch (e) {}
	}

	render() {
		const {
			temperature,
			voltage,
			boardTemperature,
			heaterPower,
			freeRam,
			speed,
			brightness,
			rgbCurrentFn,
		} = Object.assign({}, this.state, window.store)

		const heat = () => {
			if (window.store.isHeating) {
				window.emitter.emit('update', { isHeating: false })
				window.emitter.emit('send', `heat`, true)
			} else {
				window.emitter.emit('update', { isModalOpened: true })
			}
		}

		const mapTags = (tag, index) => (
			<StatusTag key={index} name={tag[0]} value={tag[1]} />
		)

		const statusColumn2 = [
			['Heater', `${heaterPower}%`],
			['PSU', `${voltage}`],
			['CPU', `${boardTemperature}°C`],
			['RAM', `${freeRam} Kb`],
		].map(mapTags)

		return (
			<div className={style.home}>
				<div className={style.card}>
					<IskraIcon />

					<StatusLabel onClick={heat} className={cn(style.status_temp, {
						[style.red]: temperature >= 160,
						[style.yellow]: temperature >= 100 && temperature < 160,
						[style.green]: temperature >= 20 && temperature < 100,
						[style.cold]: temperature < 20 || !parseInt(temperature),
					})} text={temperature > 16 ? `${temperature}°C` : `< 16°C`} />
				</div>

				<div className={style.card}>
					<div className={style.column}>
						<Slider name="Brightness" value={brightness} onChange={brightnessValue => this.changeBrightness(brightnessValue)} />
						<Slider name="Speed" value={speed} onChange={speedValue => this.changeSpeed(speedValue)} />
						<AnimationPicker value={rgbCurrentFn} onChange={fn => this.setRgbFn(fn)} />
					</div>

					<div className={style.column}>
						{statusColumn2}
					</div>
				</div>
			</div>
		);
	}
}
