import L from 'leaflet';
import PropTypes from 'prop-types';
import './styles.css';
import {
	withLeaflet, 
	MapControl
} from 'react-leaflet';

const reactToCSS = require('react-style-object-to-css')

const boxZoomControlDefaultStyle = {
	width: '32px', 
	height: '32px',
	marginRight: '11px',
	border: '1px solid rgba(0,0,0,0.5)',
	borderRadius: '4px',
	background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAB60lEQVRIie3VPWtUQRTG8d9GjQaJLopiFDVC7LSzESWIhYiCKFiIlZWFRbCxEPwINhY2AUX8APEbCDZiExLsBFEjKeIL+AYiUXct7lyYvd65mZVoBH1gmOGcPfM/M+fcWf5lPUA3Gm+wM/iuohPsizgV7OP4XIm7mQMbiNbjFd8GrAvrLWiF9Rq0w7qNoUrcoRxwrDLjwxjFpkqCu4J9eyVuW7BfDPGzObDVNbZ5vKjYOniZ2GMhzK9zgKXiq36lqN/HfjaoxPedAIxgzy9CS+1T9Mbfq1a0vqZolAlFTZu0GacVHbxVUZ5ZTOFpv0mU3+nuJRK9jPd6v91yfMMk1vcDLoNHG6C3EsDqmMHGXPCXEDSS8E9kQssxlQs+hnMJX1v6em80wI/kwlO60LC5Bt+d1IbxA9J04oMJ+6cwv42SyInrUVON7+k9yWRij/OV373LATd19W31V/khSrpT43+egg3U2M4qano8ss0k4ofDPKj3MSo1nQLHqjvRgeDbofgDqfo7uKT+tF2cScFWReshfMdcGNOKB2NR0UTDfv6Tb+Gk+tM+wpUlj5uhQdyX/4AcXQ5oqbWKjk5dbRdfwzyPseWEw35cx0M8w2PcxQnsDdDfBm/SWARfCImuCHzuT4JL+BNFSf5rZfQD0s7CMRfyzDcAAAAASUVORK5CYII=")',
	backgroundColor: 'rgb(255, 255, 255)',
	outline: 'none'
}

const boxZoomControlDefaultActiveStyle = {
	backgroundColor: '#a3a3a3'
}

L.Control.BoxZoomControl = L.Control.extend({
	_style: null,
	_activeStyle: null,
	_isActive: false,
	_startLatLng: null,
	_sticky: false,
	_drawPolygon: null,
	_boxZoomButton: null,

	initialize: function(element) {
		this.options.position = element.position;

		if (element.style === undefined) {
			this._style = reactToCSS(boxZoomControlDefaultStyle);
		} else {
			this._style = reactToCSS(element.style);
		}

		if (element.activeStyle === undefined) {
			this._activeStyle = reactToCSS(boxZoomControlDefaultActiveStyle);
		} else {
			this._activeStyle = reactToCSS(element.activeStyle);
		}

		if (element.sticky !== undefined) {
			this._sticky = element.sticky;
		}
	},
	onAdd: function(map) {
		var boxZoomButton = L.DomUtil.create('button');
		boxZoomButton.setAttribute('style',this._style);
		boxZoomButton.setAttribute('id', 'box-zoom-button');
		
		boxZoomButton.onclick = (e) => {
			if (this._isActive) {
				this._stop(map, boxZoomButton);
			} else {
				this._start(map, boxZoomButton);
			}
		};
		this._boxZoomButton = boxZoomButton;

		return boxZoomButton;
	},
	onRemove: function(map) {
		// Do nothing
	},
	_stop: function(map, boxZoomButton) {
		map.dragging.enable();
		boxZoomButton.setAttribute('style', this._style);
		L.DomUtil.removeClass(map._container, 'crosshair-cursor-enabled');
		this._isActive = false;
		this._startLatLng = null;
		
		L.DomEvent.off(map, 'mousemove', this._handleMouseMove, this);
		L.DomEvent.off(map, 'mouseup', this._handleMouseUp, this);
	},
	_handleMouseDown: function(e) {
		this._startLatLng = e.latlng;
	},
	_handleMouseMove: function(e) {
		if (this._startLatLng === null || this._startLatLng === undefined) { return; }

		var ne = this._startLatLng;
		var nw = new L.LatLng(this._startLatLng.lat, e.latlng.lng);
		var sw = e.latlng;
		var se = new L.LatLng(e.latlng.lat, this._startLatLng.lng);

		if (this._drawPolygon === null || this._drawPolygon === undefined) {
			this._drawPolygon = new L.Polygon([ne, nw, sw, se]);
			this._map.addLayer(this._drawPolygon);
		} else {
			this._drawPolygon.setLatLngs([ne, nw, sw, se]);
		}
	},
	_handleMouseUp: function(e) {
		var map = this._map;
		if (
			this._startLatLng === null || 
			this._startLatLng === undefined || 
			this._startLatLng.lat === e.latlng.lat ||
			this._startLatLng.lng === e.latlng.lng ||
			this._isActive === false) { return; }

		var ne = this._startLatLng;
		var nw = new L.LatLng(this._startLatLng.lat, e.latlng.lng);
		var sw = e.latlng;
		var se = new L.LatLng(e.latlng.lat, this._startLatLng.lng);

		var bounds = L.latLngBounds([ne, sw])
		map.fitBounds(bounds, { animate: false });

		this._startLatLng = null;
		map.removeLayer(this._drawPolygon);
		this._drawPolygon = null;

		if (this._sticky) {
			this._startLatLng = null;
		} else {
			map.dragging.enable();
			this._boxZoomButton.setAttribute('style', this._style);
			L.DomUtil.removeClass(map._container, 'crosshair-cursor-enabled');
			this._isActive = false;

			L.DomEvent.off(map, 'mousemove', this._handleMouseMove, this);
			L.DomEvent.off(map, 'mouseup', this._handleMouseUp, this);
		}
	},
	_start: function(map, boxZoomButton) {
		boxZoomButton.setAttribute('style', this._style + this._activeStyle);
		map.dragging.disable();
		L.DomUtil.addClass(map._container, 'crosshair-cursor-enabled')
		this._isActive = true;
		this._startLatLng = null;

		L.DomEvent.on(map, 'mousedown', this._handleMouseDown, this);
		L.DomEvent.on(map, 'mousemove', this._handleMouseMove, this);
		L.DomEvent.on(map, 'mouseup', this._handleMouseUp, this);
	},
	forceStop: function() {
		var map = this._map;
		var boxZoomButton = L.DomUtil.get('box-zoom-button');
		this._stop(map, boxZoomButton);
	},
	forceStart: function() {
		var map = this._map;
		var boxZoomButton = L.DomUtil.get('box-zoom-button');
		this._start(map, boxZoomButton);
	},
});

L.control.boxZoomControl = (opts) => {
    return new L.Control.BoxZoomControl({...opts});
}

class BoxZoomControl extends MapControl {

	control;

	constructor(props) {
		super(props);
	}

	createLeafletElement(props) {
		this.control = L.control.boxZoomControl({...props});
		return this.control;
	}

	stop() {
		this.control.forceStop();
	}

	start() {
		this.control.forceStart();
	}
}

export default withLeaflet(BoxZoomControl);

BoxZoomControl.propTypes = {
	sticky: PropTypes.bool,
	style: PropTypes.element,
	activeStyle: PropTypes.element,
	position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft'])
}