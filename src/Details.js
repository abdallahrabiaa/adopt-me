import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErorrBoundary from "./ErorrBoundary";
import ThemeContext from "./ThemeContext";
import {navigate} from '@reach/router'
import Modal from './Model';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showModal:false
    };
  }
  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url:animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.adress.city},${animal.contact.state}`,
        media: animal.photos,
        descrption: animal.description,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }
  toggleModel=()=>this.setState({showModal :!this.state.showModal});
  adopt=()=>navigate(this.state.url);
  render() {
    if (this.state.loading) return <h1>loading ...</h1>;
    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <h1>{name}</h1>
        <h2>{`${animal}-${breed}-${location}`}</h2>
        <ThemeContext.Consumer>
          {([theme]) => (
            <button
             onClick={this.toggleModel}
            style={{ backgroundColor: theme }}>Adopt {name}</button>
          )}
        </ThemeContext.Consumer>
        <p>{description}</p>
        {
          showModal?(
            <Modal>
              <div>
                <h1>Would you like to adopt {name} ? </h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModel}>No</button>
                </div>
                </div>
            </Modal>
          ):null
        }
      </div>
    );
  }
}
export default function DetailsWithErorrBoundary(props) {
  return (
    <ErorrBoundary>
      <Details {...props} />
    </ErorrBoundary>
  );
}
