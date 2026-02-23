import '@shopify/ui-extensions/preact';
import {render} from "preact";

// 1. Export the extension
export default async () => {
  render(<Extension />, document.body)
};

function Extension() {
  const heading = shopify.settings.value.usp_heading || "Default USP Heading";
  const text = shopify.settings.value.usp_text || "Default USP Text";
  const imageUrl = shopify.settings.value.usp_image || "https://via.placeholder.com/150";
  return (
    <s-grid>
      <s-image src=""></s-image>
      <s-grid-item>
        <s-heading></s-heading>
        <s-paragraph></s-paragraph>

      </s-grid-item>
    </s-grid>
  )
}