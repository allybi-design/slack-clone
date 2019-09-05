import React, { Component } from "react";

export default class MainWindow extends Component {
  render() {
    return (
      <div id="mainWindow">
        <nav className="navbar">
          <div className="navLogoRoom">
            <i className="fab fa-slack-hash"></i>
            <b>general</b>
          </div>
          <div className="navsearchBar">
            <i className="fas fa-info-circle"></i>
            <i className="fas fa-cog"></i>
						<input type="text" placeholder="&#xf002; Search" />
            <i className="fas fa-at"></i>
            <i className="far fa-star"></i>
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </nav>

        <article className="dailyPosts">
          <div className="posts">
            <section className="post">
              <div className="avatar">
                <i className="fas fa-user fa-2x"></i>
              </div>
              <div className="userTime">
                <b className="userName">Monica </b>
                <small>3.15pm</small>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  minima repellendus cum, libero iusto nobis sed animi eaque
                  rerum impedit.
                </p>
              </div>
            </section>

            <section className="post">
              <div className="avatar ">
                <i className="fas fa-user fa-2x"></i>
              </div>
              <div className="userTime">
                <b className="userName">Alison </b>
                <small>3.20pm</small>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  minima repellendus cum,{" "}
                </p>
              </div>
            </section>

            <section className="post">
              <div className="avatar">
                <i className="fas fa-user fa-2x"></i>
              </div>
              <div className="userTime">
                <b className="userName">Stefan</b>
                <small>3.25pm</small>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
              </div>
            </section>
          </div>
        </article>

				<div className="inputBar">
					<input type="text" placeholder="type a message..."/>
				</div>
      </div>
    );
  }
}
