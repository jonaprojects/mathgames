import React, { useEffect } from "react";

//redux
import { useDispatch } from "react-redux";
import { resetSettingsOnOtherPages } from "@/store/battleSlice";

//custom components
import Template from "@/components/template/Template";
import Container from "@/components/containers/Container";
import { H1 } from "@/components/typography/Headers";
import { P } from "@/components/typography/Paragraphs";
import PrivacySection from "@/components/privacy/Section";

export default function Privacy(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSettingsOnOtherPages());
  }, [dispatch]);

  return (
    <Template>
      <Container>
        <H1 className="mb-11">מדיניות הפרטיות שלנו</H1>
        <PrivacySection title="מבוא">
          <P>
            מדיניות פרטיות זו מתארת כיצד אנו אוספים, משתמשים ומטפלים במידע שלך
            בעת השימוש במשחק האינטרנט שלנו ללימוד לוח הכפל.
          </P>
        </PrivacySection>

        <PrivacySection title="המידע שאנחנו אוספים">
          <P>
            המידע היחיד שאנו אוספים ושומרים הוא התקדמותך במשחק. מידע זה נשמר
            באופן מקומי במכשיר שלך באמצעות טכנולוגיית אחסון מקומי. איננו אוספים
            או שומרים כל מידע אישי.
          </P>
        </PrivacySection>

        <PrivacySection title="כיצד אנחנו משתמשים במידע">
          <P>
            נתוני התקדמות המשחק משמשים אך ורק לשיפור חווית המשחק שלך על ידי מתן
            אפשרות להמשיך מהנקודה בה הפסקת בהפעלות קודמות.
          </P>
        </PrivacySection>

        <PrivacySection title="אחסון נתונים">
          <P>
            כל נתוני התקדמות המשחק מאוחסנים באופן מקומי במכשיר שלך. איננו
            מעבירים או מאחסנים מידע זה בשרתים שלנו.
          </P>
        </PrivacySection>

        <PrivacySection title="שיתוף נתונים">
          <P>
            איננו משתפים כל מידע עם צדדים שלישיים, מכיוון שכל הנתונים נשארים
            במכשיר המקומי שלך.
          </P>
        </PrivacySection>

        <PrivacySection title="פרטיות ילדים">
          <P>
            המשחק שלנו מיועד לילדים ללמידת לוח הכפל. איננו אוספים ביודעין מידע
            אישי מילדים או כל משתמשים אחרים.
          </P>
        </PrivacySection>

        <PrivacySection title="שינויים במדיניות זו">
          <P>
            אנו עשויים לעדכן את מדיניות הפרטיות שלנו מעת לעת. נודיע לך על כל
            שינוי על ידי פרסום מדיניות הפרטיות החדשה בדף זה.
          </P>
        </PrivacySection>

        <PrivacySection title="צור קשר">
          <P>
            אם יש לך שאלות כלשהן לגבי מדיניות פרטיות זו, אנא צור איתנו קשר ב-
            jonaprojects13579@gmail.com
          </P>
        </PrivacySection>
      </Container>
    </Template>
  );
}
