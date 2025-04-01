import { Fragment } from "react";

export const useFormatMessage = (message: string): any => {
  // return useMemo(() => {
  return message.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
  // }, [message]); // 의존성 배열 추가
};

// export const useFormatInfoModalMessage = (
//   message: string,
//   icons?: string,
// ): any => {
//   // return useMemo(() => {
//   return message.split('\n').map((line, index) => (
//     <Fragment key={index}>
//       {icons && <img src={icons} alt="info_icon" />}
//       {line}
//       <br />
//     </Fragment>
//   ));
//   // }, [message]); // 의존성 배열 추가
// };

/**
 * alert type = INFO 에 쓰이는 커스텀 훅.
 * 문자열에 <b></b> 를 포함할 경우 강조, \n을 포함할경우 다음줄로 넘어감
 * @param message
 * @param icons
 * @returns
 */
export const useFormatInfoModalMessage = (
  message: string,
  icons?: string
): any => {
  return message.split("\n").map((line, index) => {
    // `<b>...</b>` 태그를 감지하여 React 요소로 변환
    const formattedLine = line.split(/(<b>.*?<\/b>)/g).map((part, i) => {
      if (part.startsWith("<b>") && part.endsWith("</b>")) {
        return (
          <b className="emphasize" key={i}>
            {part.replace(/<\/?b>/g, "")}
          </b>
        );
      }
      return part;
    });

    return (
      <Fragment key={index}>
        <span>
          {icons && <img src={icons} alt="info_icon" />}
          {formattedLine}
        </span>
        {/* <br /> */}
      </Fragment>
    );
  });
};
