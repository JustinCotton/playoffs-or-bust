import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Team extends Component {

    state = {
            team: {
                players: []
            }
    }

    componentDidMount() {
        const teamId = this.props.match.params.id;
        this.fetchTeam(teamId)
    }

    fetchTeam = async (teamId) => {
        try {
            const teamResponse = await axios.get(`/api/v1/teams/${teamId}`)
            this.setState({
                team: teamResponse.data
            })
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    deleteTeam = () => {
        axios.delete(`/api/v1/teams/${this.props.match.params.id}`).then(res => {
            this.setState({redirectToHome: true})
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }
  
    handleChange = (e) => {
        const cloneTeam = {...this.state.team}
        cloneTeam[e.target.name] = e.target.value
        this.setState({team: cloneTeam})
    }
  
    updateTeam = (e) => {
        e.preventDefault()
        axios
          .put(`/api/v1/teams/${this.props.match.params.id}/`, this.state.team)
          .then(res => {
              this.setState({team: res.data, isEditFormDisplayed: false})
          })
    }

    render() {

        if(this.state.redirectToHome) {
            return (<Redirect to="/teams" />)
        }

        const logoStyle = {
            margin: "10px",
            height: "250px",
            borderRadius: "20px"
        }

        const logosStyle = {
            display: "inline-block",
            margin: "10px"
        }

        return (

            <div>
        {
            this.state.isEditFormDisplayed
                ? <div><h1>Change to {this.state.team.teamName}</h1>
                <div><img src={this.state.team.team_logo_url} alt='' style={logoStyle}/></div>
                <form onSubmit={this.updateTeam}>
                <div>
                        <label htmlFor="teamName">Team Name: </label>
                        <textarea
                            id="teamName"
                            type="text"
                            name="teamName"
                            onChange={this.handleChange}
                            value={this.state.team.teamName}
                        />
                    </div>
                    <div>
                        <label htmlFor="team_logo_url">Image URL: </label>
                        <textarea
                            id="image"
                            type="text"
                            name="team_logo_url"
                            onChange={this.handleChange}
                            value={this.state.team.team_logo_url}
                        />
                    </div>
                    <div>
                        <label htmlFor="sport">Sport: </label>
                        <textarea
                            id="sport"
                            type="text"
                            name="sport"
                            onChange={this.handleChange}
                            value={this.state.team.sport}
                        />
                    </div>
                    <div>
                        <label htmlFor="league">League: </label>
                        <textarea
                            id="league"
                            type="text"
                            name="league"
                            onChange={this.handleChange}
                            value={this.state.team.league}
                        />
                    </div>
                    <div>
                        <label htmlFor="wins">Wins: </label>
                        <textarea
                            id="wins"
                            type="text"
                            name="wins"
                            onChange={this.handleChange}
                            value={this.state.team.wins}
                        />
                    </div>
                    <div>
                        <label htmlFor="losses">Losses: </label>
                        <textarea
                            id="losses"
                            type="text"
                            name="losses"
                            onChange={this.handleChange}
                            value={this.state.team.losses}
                        />
                    </div>
                    <div>
                        <label htmlFor="players">Players: </label>
                        <textarea
                            id="players"
                            type="text"
                            name="players"
                            onChange={this.handleChange}
                            value={this.state.team.players}
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="favorite">Favorite?  </label>
                        <input
                            id="favorite"
                            type="checkbox"
                            name="favorite"
                            onChange={this.handleChange}
                            value={this.state.team.favorite}
                        />
                    </div> */}
                    <button>Rename to {this.state.team.teamName}</button>
                    <button onClick={this.toggleEditForm}>Cancel</button>
                </form>
                </div>
                : <div>
                <img src={this.state.team.team_logo_url} alt="" style={logoStyle}/>
                <h2>{this.state.team.teamName}</h2>
                {this.state.team.players.map(player => (
                    <div key={player.id} style={logosStyle}>
                        {/* <h4>{team.teamCity} {team.teamName}</h4> */}
                        <Link to={`/players/${player.id}`}><img src={player.player_photo_url} alt="" style={logoStyle}/></Link>
                        <h2>{player.playerName}</h2>
                    </div>
                ))}
                <div>
                    <Link to="/teams"><button>Back to Teams</button></Link>
                    <button onClick={this.toggleEditForm}>Update Team</button>
                    <button onClick={this.deleteTeam}>Delete Team</button>
                </div>
            </div>
        }
      </div>

            
        );
    }
}

export default Team;