import React from "react";
import images from "../../assets/images";
import "./styles.scss";

const HomeScreen = () => {
	return (
		<section className="section">
			<div className="container">
				<h1 className="title title has-text-centered is-size-1 mb-6">Getting Started!</h1>
				<h2>Welсome to the manager of recipes</h2>
				<img src={images.Home} alt="home" />
			</div>
		</section>
	)
};

export default HomeScreen;