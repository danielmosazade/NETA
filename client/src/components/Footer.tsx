import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 6, mt: 8 }}>
      <Container maxWidth="lg">

        {/* 3 Columns – Flexbox */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {/* Column 1 */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              חנות אופנה
            </Typography>
            <Typography variant="body2" color="text.secondary">
              היעד שלך לבגדים טרנדיים ונוחים.
            </Typography>
          </Box>

          {/* Column 2 */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              קישורים מהירים
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" color="inherit">בית</Link>
              <Link href="#" color="inherit">מוצרים</Link>
              <Link href="#" color="inherit">אודות</Link>
              <Link href="#" color="inherit">צור קשר</Link>
            </Box>
          </Box>

          {/* Column 3 */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              צור קשר
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@fashionstore.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 (555) 123-4567
            </Typography>
          </Box>
        </Box>

        {/* Bottom line */}
        <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #e0e0e0" }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 חנות אופנה. כל הזכויות שמורות.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
