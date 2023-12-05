import React from "react";

import Template from "@/components/template/Template";
import Container from "@/components/containers/Container";
import { H1 } from "@/components/typography/Headers";
import { StoryParagraph } from "@/components/typography/Paragraphs";
import Sprite from "@/components/sprite/Sprite";
import TextBox from "@/components/textbox/Textbox";
import TalkingSprite, {
  TalkingSpriteShowOnClick,
} from "@/components/sprite/TalkingSprite";
export default function Story(props) {
  return (
    <Template>
      <Container>
        <H1 className="mb-8">איך הכל התחיל?</H1>
        <StoryParagraph className="mb-3">
          בִּכְפָר קָטָן וְעַתִּיק רָחוֹק רָחוֹק מֵעַל הַר גָּבוֹהַּ, יֶשְׁנוֹ
          פֶּתַח קָסוּם...
        </StoryParagraph>
        <StoryParagraph className="mb-3">
          מִי שֶׁמִּתְמַזֵּל מַזָּלוֹ וּמְטַיֵּל שָׁם, מוֹצֵא אֶת הַפֶּתַח,
          וּלְעִתִּים אַף עוֹבֵר בּוֹ...
        </StoryParagraph>
        <StoryParagraph className="mb-3">
          שָׂדוֹת יְרֻקִּים, רְחָבִים וְרַעֲנַנִּים מְפָאֲרִים אֶת הַנּוֹף שֶׁל
          הַכְּפָר הַקָּסוּם..
        </StoryParagraph>
        <StoryParagraph className="mb-3">
          בַּכְּפָר הַקָּסוּם, חַיִּים יַחַד כָּל בַּעֲלֵי הַחַיִּים..
        </StoryParagraph>
        <StoryParagraph className="mb-6">
          אֲפִלּוּ בַּעֲלֵי חַיִּים שֶׁאֲנַחְנוּ חוֹשְׁבִים שֶׁכְּבָר לֹא
          קַיָּמִים...שֶׁנִּכְחֲדוּ..
        </StoryParagraph>
        <div className="flex">
          <TalkingSpriteShowOnClick
            src="/animals/dinosaur2.png"
            message="איך אני אוהב את לוח הכפל!"
          />
          <TalkingSpriteShowOnClick
            src="/animals/unicorn.png"
            message="שלום! איזה כיף שבאת! "
          />
        </div>
        <StoryParagraph className="mb-3 mt-14">
          יוֹם אֶחָד, הֶחֱלִיט הַמּוֹרֶה בַּכְּפָר, לַעֲרֹךְ יְרִיד גָּדוֹל
          שֶׁבּוֹ יִלְמְדוּ גּוּרֵי הַחַיּוֹת אֶת לוּחַ הַכֶּפֶל...
        </StoryParagraph>
        <StoryParagraph className="mb-3">
          וְכָךְ הִכְרִיז: הַגּוּר אוֹ הַגּוּרָה שֶׁיָּדְעוּ אֶת לוּחַ הַכֶּפֶל
          בְּעַל פֶּה יִזְכּוּ לְשַׂחֵק בְּתַחֲרוּת לוּחַ הַכֶּפֶל עִם יַלְדֵי
          הַכְּפָר הַשָּׁכֵן..
        </StoryParagraph>
        <StoryParagraph className="mb-3">
          רֵקְס, בְּרָכָה, שׁוּלִי הַחֲמוֹר וּפִילֵי הַפִילְפִּילוֹן חָבְרוּ
          יַחְדָּו כְּדֵי לְהִתְאַמֵּן...
        </StoryParagraph>
        <StoryParagraph className="mb-6">
          עָזְרוּ לָהֶם לְהִתְאַמֵּן יְלָדִים.
        </StoryParagraph>
        <div className="flex">
          <Sprite src="/animals/panda.png" />
          <Sprite src="/animals/pig.png" />
        </div>
      </Container>
    </Template>
  );
}
