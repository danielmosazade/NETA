import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '40px 20px' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          אודות חנות האופנה
        </Typography>
      </Box>
      <Typography variant="body1" paragraph>
        ברוכים הבאים לחנות האופנה שלנו! אנחנו מתמחים במתן בגדים איכותיים וטרנדיים לכל המשפחה.
        החנות שלנו מציעה מגוון רחב של מוצרים, החל מבגדי יומיום ועד לבגדי ערב מיוחדים.
      </Typography>
      <Typography variant="body1" paragraph>
        המטרה שלנו היא להביא לכם את הטוב ביותר בעולם האופנה, עם דגש על איכות, נוחות וסגנון.
        אנחנו מאמינים שכל אחד ראוי להיראות ולהרגיש טוב, ולכן אנחנו מציעים ייעוץ אישי ומקצועי לכל לקוח.
      </Typography>
      <Typography variant="body1" paragraph>
        תודה שבחרתם בנו. אנחנו מחכים לראות אתכם בחנות!
      </Typography>
    </Container>
  );
};

export default About;
