import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const MyGoogleMapComponent = withGoogleMap(props => (
    <GoogleMap/>
));

