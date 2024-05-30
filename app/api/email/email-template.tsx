import React from "react";

interface EmailTemplateProps {
  firstname: string;
}
const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstname,
}) => {
  return (
    <div>
      <h1>Welcome,{firstname}</h1>
    </div>
  );
};

export default EmailTemplate;
