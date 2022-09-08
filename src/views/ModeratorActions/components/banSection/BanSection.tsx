import { useEffect, useState } from "react";
import { Flex, Text, SeparatorVertical, Link } from "brainly-style-guide";
import Moment from "react-moment";

import GetBanDetails, { UserBanDetails } from "@brainly/GetUserBanDetails";
import flash from "@utils/flashes";
import locales from "@locales";

export default function BanSection(props: {
  userId: number;
}) {
  const [banDetails, setBanDetails] = useState<UserBanDetails>(null);

  useEffect(() => {
    GetBanDetails(props.userId)
      .then(data => setBanDetails(data))
      .catch(err => flash("error", err.message));
  }, []);

  const expiresIn = banDetails?.active?.expiresIn;

  return (
    <Flex fullWidth marginBottom="xxs">
      {banDetails && 
        <Flex fullWidth alignItems="center">
          <Text className="sg-flex--no-shrink">
            {locales.common.bans}:
            <Text type="span" inherited weight="bold" color="text-red-60"> {banDetails.banCount}</Text>
          </Text>
          {!!banDetails.active && <>
            <SeparatorVertical color="gray-50" />
            <Flex direction="column"className="ban-active" fullWidth>
              <Text size="small">
                <Text weight="bold" inherited type="span">{banDetails.active.type}</Text>
                . {locales.common.givenBy}
                <Link inherited weight="bold" target="_blank" href={banDetails.active.givenBy.link}> {banDetails.active.givenBy.nick}</Link>
              </Text>
              {expiresIn ?
                <span>
                  <b>{locales.common.bans_LEFT}: </b>
                  <Moment date={expiresIn} interval={1} format="hh:mm:ss" durationFromNow filter={d => d.replace(/^-/, "")} />
                </span> :
                <Text size="xsmall">{locales.common.hasNotStartedYet}</Text>
              }
            </Flex>
          </>}
        </Flex>
      }
    </Flex>
  );
}