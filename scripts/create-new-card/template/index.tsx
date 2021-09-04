import { VercelRequestQuery } from "@vercel/node";
import Card, { CommonProps } from "../Card";
import translation from "./translation";
import SVGRender from "../../helpers/SVGRender";
import CardContainer from "../../components/CardContainer";
import { getCardColors } from "../../utils/render";

export interface Props extends CommonProps {
  /** add props */
}

interface FetchStats {
  /** describe fetchStats return data */
}

export default class NewCard extends Card {
  constructor(props: VercelRequestQuery) {
    super(props, translation);
  }
  protected preprocess(props: VercelRequestQuery): Props {
    const commonProps = super.preprocess(props);

    /** initialize exclusive props */

    return {
      ...commonProps,
    };
  }
  protected checkProps() {
    super.checkProps();
    /** check exclusive props */
  }

  protected async fetchStats(): Promise<FetchStats> {
    /** request data */
    return await Promise.resolve({});
  }

  protected renderCard(stats: FetchStats): SVGRender.SVGElement {
    /**
     * render svg, support jsx
     * you can find exist components in src/components
     */
    const colors = getCardColors({});
    return <CardContainer colors={colors}></CardContainer>;
  }
}
