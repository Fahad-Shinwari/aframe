import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Places from './data.json'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: './assets/kat_church.jpg',
      positionA:"4 1.8 4",
      positionB:"-1.5 1.8 -3",
      place:"place1"
    };
  }

  changePicture = (place) => {
    const Selectedplace = Places.places.filter(p=>p._id === place)
    Selectedplace[0] &&
    this.setState({
      image: Selectedplace[0].image,
      positionA:Selectedplace[0].positionA,
      positionB:Selectedplace[0].positionB,
      place
    })
  }

  render () {
    // Add Location 1 tags
    let locationTag1 = 
    this.state.place === "place1" ?
    <Entity primitive="a-image" src="#a1" position={this.state.positionA} events={{click: ()=>this.changePicture("place2")}} /> :
    this.state.place === "place2" ?
     <Entity primitive="a-image" src="#a1" position={this.state.positionA} events={{click: ()=>this.changePicture("place3")}} /> :
     this.state.place === "place3" ?
      <Entity primitive="a-image" src="#a1" position={this.state.positionA} events={{click: ()=>this.changePicture("place4")}} />:
     this.state.place === "place4" ?
      <Entity primitive="a-image" src="#a1" position={this.state.positionA} events={{click: ()=>this.changePicture("place5")}} />
   :this.state.place === "place5" ?
    <Entity primitive="a-image" src="#a1" position={this.state.positionA} events={{click: ()=>this.changePicture("place6")}} />
   : <Entity primitive="a-image" src="#a1" position={this.state.positionA} events={{click: ()=>this.changePicture("place1")}} />

    // Add Location 2 tags
   let locationTag2 = 
   this.state.place === "place1" ?
    <Entity primitive="a-image" src="#a1" position={this.state.positionB} events={{click: ()=>this.changePicture("place3")}} /> :
    this.state.place === "place2" ?
     <Entity primitive="a-image" src="#a1" position={this.state.positionB} events={{click: ()=>this.changePicture("place4")}} /> :
     this.state.place === "place3" ?
      <Entity primitive="a-image" src="#a1" position={this.state.positionB} events={{click: ()=>this.changePicture("place5")}} />:
     this.state.place === "place4" ?
      <Entity primitive="a-image" src="#a1" position={this.state.positionB} events={{click: ()=>this.changePicture("place6")}} />
   :this.state.place === "place5" ?
    <Entity primitive="a-image" src="#a1" position={this.state.positionB} events={{click: ()=>this.changePicture("place1")}} />
   : <Entity primitive="a-image" src="#a1" position={this.state.positionB} events={{click: ()=>this.changePicture("place2")}} />

    return (
      <Scene>
        <a-assets>
          {/* Images must be dropped here */}
          <img id="a1" src={require('./assets/front.png')} alt="location tag"/>
          <img id="map" src={require('./assets/map.png')} alt="Map"/>
        </a-assets>

        {/* Location Cursor images to move to the next image */}
        {locationTag1} { locationTag2}

        {/* a-cursor is for making images clickable */}
        <Entity primitive="a-camera">
            <Entity primitive="a-cursor"/>  
            <Entity primitive="a-image" src="#map" position="-4.8 2 -3" /> 
            {/* For map to be selected add an onclick <Entity primitive="a-cursor" position="-4.8 2 -3" />          */}
        </Entity> 
        
        {/* a-sky is the background image tag */}
        <Entity primitive="a-sky" src={require(this.state.image)} alt={this.state.image} />
        <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>
        {/* <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        // 
        <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>
        <Entity text={{value: 'Hello, A-Frame React!', align: 'center'}} position={{x: 0, y: 2, z: -1}}/> */}

        {/* <Entity id="box"
          geometry={{primitive: 'box'}}
          material={{color: this.state.color, opacity: 0.6}}
          animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
          animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          position={{x: 0, y: 1, z: -3}}
          events={{click: this.changeColor.bind(this)}}>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                  geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                  material={{color: '#24CAFF'}}/>
        </Entity> */}
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
