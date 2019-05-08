import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Modal from '../Modal/Modal';
import './Map.css';

import getData from '../../api';


class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
      isOpen: false,
      country: '',
      capitalCity: '',
      temperature: '',
      seasson: '',
      loading: false
    };
  }

  static defaultProps = {
    apiKey: 'AIzaSyANCUL4rFimlAwC-vK3XwKiQFHi72O-uLY',
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 0,
    mapOptions: {
      disableDefaultUI: true,
      scrollwheel: false,
      zoomControl: false
    }
  };

  onClick = async ({ lat, lng }) => {
    this.setState({ loading: true });
    try {
      const data = await getData(`${lat},${lng}`);
      console.log('log', data);
      this.setState({
        isActive: true,
        error: data.message !== undefined ? data.message : null,
        lat,
        lng,
        isOpen: true,
        country: data.country,
        temperature: data.temperature,
        capital: data.capitalCity,
        loading: false
      });
    } catch (e) {
      console.log(`Error ${e}`);
    }
  }

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div className="Map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={this.props.mapOptions}
          onClick={this.onClick}
        >
          <Modal
            error={this.state.error}
            isOpen={this.state.isOpen}
            loading={this.state.loading}
            country={this.state.country}
            capital={this.state.capital}
            temperature={this.state.temperature}
            closeModal={this.handleCloseModal}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
