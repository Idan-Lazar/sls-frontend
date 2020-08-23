import React from "react";
import styles from "./Auction.module.scss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Countdown from "react-countdown";
import {CardHeader, Avatar } from '@material-ui/core';
import styled from 'styled-components';

const Label = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #919191;
`;

const Value = styled.span`
  font-size: 14px;
`;

const Auction = ({ auction, onBid, bidState }) => {
  const amount = auction.highestBid.amount;

  const pictureUrl = auction.pictureUrl ? auction.pictureUrl : 'placeholder.png';

  return (
    <Card className={styles.root}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={styles.avatar}>
              {auction.seller[0].toUpperCase()}
            </Avatar>
          }
          title={auction.title}
        />
        <CardMedia
          className={styles.media}
          image={pictureUrl}
          title="Contemplative Reptile"
        />
        <CardContent className={styles.detailsContainer}>
          <div className={styles.details}>
              <div>
                <Value>{amount === 0 ? 'No bids' : `$${amount}`}</Value>
                <Label>HIGHEST BID</Label>
              </div>
          </div>
          <div className={styles.details}>
            <div>
              <Countdown
                date={auction.endingAt}
                renderer={({ hours, minutes, seconds }) => (
                  <Value>
                    {hours} hours {minutes} mins {seconds} secs
                  </Value>
                )}
              />
              <Label>TIME REMAINING</Label>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={styles.cardActions}>
          { (bidState === 'OWN_AUCTION' || bidState === 'HIGHEST_BIDDER') && (
            <Button
              disabled={true}
              onClick={() => onBid()}
            >
              {bidState === 'OWN_AUCTION' ? 'This is your auction' : 'You are the highest bidder'}
            </Button>
          )}

          { bidState === 'CAN_BID' && (
            <Button
              variant="outlined"
              className={styles.bidButton}
              onClick={() => onBid()}
            >
              Bid now!
            </Button>
          )}

        </div>
      </CardActions>
    </Card>
  );
};

export default Auction;
