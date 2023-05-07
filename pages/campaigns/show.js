import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Card } from "semantic-ui-react";
import Layout from "../../components/Layout";
import ContributeForm from "../../components/ContributeForm";
import campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

class ShowCampaign extends Component {
  static async getInitialProps(props) {
    const cn = await campaign(props.query.address);
    const cnSummary = await cn.methods.getCampaignSummary().call();
    console.log(cnSummary);

    return {
      minContribution: cnSummary.minContribution,
      contractBalance: cnSummary.contractBalance,
      requestCount: cnSummary.requestCount,
      contributorsCount: cnSummary.contributorsCount,
      managerAddress: cnSummary.managerAddress,
    };
  }

  renderCards() {
    const {
      minContribution,
      contractBalance,
      requestCount,
      contributorsCount,
      managerAddress,
    } = this.props;

    const items = [
      {
        header: managerAddress,
        meta: "Address of Manager",
        description:
          "The Manager created this campaign and can request for withdrawal",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minContribution,
        meta: "Minimum contribution (wei)",
        description:
          "You should contribute atleast this much wei to enter campaign",
      },
      {
        header: requestCount,
        meta: "Requests count",
        description: "A request is to withdraw money from the contract",
      },
      {
        header: contributorsCount,
        meta: "Number of contributors/approvers",
        description: "People who participated or contributed in this Campaign",
      },
      {
        header: web3.utils.fromWei(contractBalance, "ether"),
        meta: "Campaign balance (in ETH)",
        description: "Amount of money in the Campaign left to spend",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign details</h3>
        {this.renderCards()}
        <ContributeForm />
      </Layout>
    );
  }
}

export default ShowCampaign;
