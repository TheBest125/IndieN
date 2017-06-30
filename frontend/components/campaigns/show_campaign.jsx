import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

class ShowCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backIt: false,
      amount: 0,
      campaign_id: this.props.campaignId
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenContributions = this.handleOpenContributions.bind(this);
  }

  componentDidMount() {
    const id = this.props.campaignId
    if (!this.props.campaign[id]) {
      this.props.requestSingleCampaign(id)
        .then(action => this.props.history.push(`/campaigns/${id}`));
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.campaign);
  }

  handleSubmit(e) {
    e.preventDefault();
    const contribution = Object.assign(
    {},
    {
      amount: this.state.amount,
      campaign_id: this.state.campaign_id
    });

    this.props.createContribution(contribution)
      // .then(action => console.log('yo'));
      .then(action => this.props.requestSingleCampaign(this.props.campaignId));
    // this.setState({ amount: 0 });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleOpenContributions() {
    this.setState({ backIt: true });
  }

  renderImageBox() {
    const { image_url } = this.props.campaign
    return (
      <div className="media-box">
        <img className="media-box-img" src={`${image_url}`}/>
      </div>
    );
  }

  renderCampSummary() {
    const { campaign } = this.props
    return (
      <div className="camp-summary-scope">
        <div className="camp-summary-cont">
          {this.renderImageBox()}
          <div className="camp-show-header">
            <div className="camp-title">{campaign.title}</div>
            <div className="camp-tagline">{campaign.tagline}</div>
            {this.renderCreatorBox()}
            {this.renderCampProgress()}
            {this.state.backIt === true ? this.renderContributionReady() : this.renderContributionNotReady()}
          </div>
        </div>
      </div>
    );
  }

  renderCreatorBox() {
    return (
      <div className="camp-creator">
        <img src="http://www.avatarsdb.com/avatars/homer_beer_belly.gif"
          className="creator-pic"/>
        <div className="creator-details">
          <div className="details-name">Creator Name</div>
          Manhattan, NY
          <div className="details-link">
            <Link to="/">About</Link>
          </div>
        </div>
      </div>
    );
  }

  renderCampProgress() {
    const { progress } = this.props.campaign;
    const percentage = `${progress}%`;
    const backersNum = this.props.campaign.backers + '';
    const backersStr = (backersNum === '1' ? 'backer' : 'backers')
    return (
      <div className="camp-progress">
        <div className="progress-raised">
          <span className="total-amount">${this.props.campaign.current_amount} </span>
           USD
          <span> raised by {this.props.campaign.backers} {backersStr}</span>
        </div>
        <div className="camp-goal-bar">
          <div className="camp-prog-bar" style={{ width: `${percentage}`, maxWidth: '100%' }}></div>
        </div>
        <div className="camp-progress-details">
          <em>{percentage}</em> of ${this.props.campaign.goal_amount}
        </div>
      </div>
    )
  }

  renderContributionNotReady() {
    return (
      <div className="contribute-section">
        <div className="contribution-action">
          <div className="contr-non-active">
            <button className="open-contr-btn submit-btn" onClick={this.handleOpenContributions}>
              Back It
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderContributionReady() {
    return (
      <div className="contribute-section">
        <div className="contribution-action">
          <div className="contr-active">
            <form className="contribute-form" onSubmit={this.handleSubmit}>
              <input className="text-field contr-input"
                type="text"
                min="1.00"
                pattern="^\d+([,.][0-9]{1,2})?$"
                onChange={this.update('amount')}
                placeholder="Donation Amount"/>
              <input className="submit-btn cntr-btn" type="submit" value="CHECK OUT" />
            </form>
          </div>
        </div>
      </div>
    );
  }

  render() {
    debugger;
    return (
      <div className="show-camp-scope">
        {this.renderCampSummary()}
        <div>
          <h1>Overview</h1>
          <div>{this.props.campaign.Overview}</div>
        </div>
      </div>
    );
  }
}

export default ShowCampaign;