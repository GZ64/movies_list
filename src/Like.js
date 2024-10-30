import React, { Component } from 'react';

class Like extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            dislikes: 0,
            checkedlikes: false,
            checkeddislikes: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    // au montage du composant on set les likes/dislikes dans les states
    componentDidMount() {
        this.setState({ likes: this.props.likes});
        this.setState({ dislikes: this.props.dislikes});
    }
    // quand on vote
    handleClick(e) {
        if (e.currentTarget.id === "like") { // soit c'est un like
            if (this.state.checkedlikes) { // si le like est deja checked on retire la coche et le vote
                this.setState({ likes: this.state.likes - 1});
                this.setState({ checkedlikes: false});
            } else { // si il est pas checked on ajoute le vote et la coche
                this.setState({ likes: this.state.likes + 1});
                this.setState({ checkedlikes: true});
            }
        }
        if (e.currentTarget.id === "dislike") { // soit c'est un dislike meme logique
            if (this.state.checkeddislikes) {
                this.setState({ dislikes: this.state.dislikes - 1});
                this.setState({ checkeddislikes: false});
            } else {
                this.setState({ dislikes: this.state.dislikes + 1});
                this.setState({ checkeddislikes: true});
            }
        }
    }

    render() {
        const { likes, checkedlikes, checkeddislikes, dislikes } = this.state;
        return (
            <div>
                <div id="like" className="like-bloc" onClick={checkeddislikes ? "" : this.handleClick}>
                    <svg viewBox="0 0 24 24" className="like">
                        <g fill={checkedlikes ? "#ffff00" : "#909090"}>
                            <path
                                d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path>
                        </g>
                    </svg>
                    <span>{likes}</span>
                </div>
                <div id="dislike" className="like-bloc" onClick={checkedlikes ? "" : this.handleClick}>
                    <svg viewBox="0 0 24 24" className="dislike">
                        <g fill={checkeddislikes ? "#ffff00" : "#909090"}>
                            <path
                                d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path>
                        </g>
                    </svg>
                    <span>{dislikes}</span>
                </div>
            </div>
        );
    }
}

export default Like;