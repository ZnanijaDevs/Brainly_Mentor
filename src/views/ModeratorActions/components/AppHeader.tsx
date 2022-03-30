import React from "react";
import { Avatar, Button, Flex, HomeButton, Icon, LogoType, Select, Text, Link }
  from "brainly-style-guide";

import locales from "@locales";
import Filters from "./Filters";
import { MenteeCommonData, Mentor } from "@typings";

type AppHeaderProps = {
  onChange: (number) => Promise<void>;
  pageId: number;
  loading: boolean;
  hasNextPage: boolean;
  mentees: MenteeCommonData[];
  userId: number;
  me: Mentor;
}

export default class AppHeader extends React.Component<AppHeaderProps> {
  constructor(props: AppHeaderProps) {
    super(props);
  }

  private UpdatePage(
    page: "previous" | "next" | "current" | number
  ) {
    let pageId = this.props.pageId;

    if (typeof page === "number") {
      pageId = page;
    } else if (page !== "current") {
      pageId = page === "previous" ? --pageId : ++pageId;
    }

    this.props.onChange(pageId);
  }

  render() {
    const { me, mentees } = this.props;
    let currentUserAvatar = mentees.find((mentee => mentee.id === this.props.userId))?.avatar;

    if (typeof currentUserAvatar == "undefined")
      // eslint-disable-next-line max-len
      currentUserAvatar = "https://mentors.br-helper.com/static/travolta.gif";

    return (
      <Flex className="actions-header" alignItems="center" justifyContent="space-between" disabled={this.props.loading}>
        <HomeButton type={locales.marketName as LogoType} href="/" />
        <Flex alignItems="center" className="actions-pagination">
          <Button disabled={this.props.pageId === 1} onClick={_ => this.UpdatePage("previous")} title={locales.common.previousPage} type="transparent" iconOnly icon={<Icon type="arrow_left" color="icon-black" size={24} />} size="s" />
          <Text weight="bold" type="span" size="small" className="actions-pagination-number">{this.props.pageId}</Text>
          <Button disabled={!this.props.hasNextPage} onClick={_ => this.UpdatePage("next")} title={locales.common.nextPage} type="transparent" iconOnly icon={<Icon type="arrow_right" color="icon-black" size={24} />} size="s" />
        </Flex>
        <Flex alignItems="center">
          <Link href={`/users/redirect_user/${this.props.userId}/`}>
            <Avatar imgSrc={currentUserAvatar}/>
          </Link>
          {!!this.props.mentees.length &&
            <Select value={this.props.userId.toString()} options={
              [me, ...mentees].map((user: MenteeCommonData) =>
                ({ value: user.id.toString(), text: user.nick })
              )
            }
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              window.location.href = `/moderation_new/view_moderator/${e.currentTarget.value}/`;
            }}
            />
          }
          <Filters />
        </Flex>
      </Flex>
    );
  }
}