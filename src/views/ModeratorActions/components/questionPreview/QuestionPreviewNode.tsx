import { Box, Flex, Text, Icon, Avatar, Link } from "brainly-style-guide";
import replaceTextWithLinks from "@utils/replaceTextWithLinks";
import locales from "@locales";
import type { 
  QuestionDataInGetQuestionResponse, 
  ResponseDataInGetQuestionResponse 
} from "@typings/responses";

export default function QuestionPreviewNode(props: {
  node: QuestionDataInGetQuestionResponse | ResponseDataInGetQuestionResponse
}) {
  let node = props.node;

  let isAnswer = !("link" in node);
  let answer = node as ResponseDataInGetQuestionResponse;
  let author = node.author;

  return (
    <Box color="white" border borderColor="gray-20" className="question-preview-content-box">
      <Flex justifyContent="space-between" className="question-preview-content-box-header">
        <Text size="small" weight="bold">
          {locales.common[isAnswer ? "answer" : "question"]}
        </Text>
        <Text color="text-gray-70" size="small">
          {new Date(node.created).toLocaleString("ru-RU")}
        </Text>
        {(isAnswer && answer.isBest) && <Icon type="crown" color="icon-yellow-50" size={16} />}
      </Flex>
      <Flex direction="column" className="question-preview-content-box-content" data-is-deleted={!isAnswer && node.isDeleted}>
        <Flex alignItems="center" className="sg-flex--gap-s">
          <Avatar size="s" imgSrc={author.avatar} />
          <Flex direction="column">
            <Link target="_blank" href={`/users/redirect_user/${author.id}`} weight="bold" size="small" color="text-black">
              {author.nick}
            </Link>
            <Flex direction="column">
              {author.ranks.map((rank, i) => <Text key={i} size="small" type="span">{rank}</Text>)}
            </Flex>
          </Flex>
        </Flex>
        <Text className="sg-flex--margin-top-s" size="small" dangerouslySetInnerHTML={{
          __html: replaceTextWithLinks(node.content)
        }} />
        {node.hasAttachments &&
          <Flex marginTop="s" alignItems="center" className="question-preview-content-box-attachments">
            <a target="_blank" href={node.attachments[0]} rel="noreferrer" style={{ margin: "auto" }}>
              <img src={node.attachments[0]} style={{ width: "200px", height: "auto" }} />
            </a>
          </Flex>
        }
      </Flex>
      {node.isReported && 
        <Icon className="question-preview-report-flag" type="report_flag" color="icon-red-50" size={32} />
      }
    </Box>
  );
}