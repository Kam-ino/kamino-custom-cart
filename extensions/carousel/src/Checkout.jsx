import '@shopify/ui-extensions/preact';
import {render} from 'preact';

const TESTIMONIALS = [
  {quote: 'Arrived fast and the quality exceeded expectations.', name: 'Alyssa R.', detail: 'Verified buyer', rating: 5},
  {quote: 'Customer support helped me pick the right size in minutes.', name: 'Marco S.', detail: 'Verified buyer', rating: 4},
  {quote: 'Best purchase this year. Will order again.', name: 'Jules P.', detail: 'Verified buyer', rating: 5},
  {quote: 'Fits perfectly and looks premium.', name: 'Denise K.', detail: 'Verified buyer', rating: 4},
];

export default function () {
  render(<Extension />, document.body);
}

function StarsText({rating}) {
  const full = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);
  return (
    <s-box accessibilityLabel={`${rating} out of 5 stars`}>
      <s-text type="small" color="subdued">
        {full}{empty}
      </s-text>
    </s-box>
  );
}

function Extension() {
  const CARD_WIDTH = 260; // tweak to taste

  return (
    <s-stack direction="block" gap="base">
      <s-heading>What customers say</s-heading>

      <s-scroll-box
        overflow="hidden auto"          // block inline  => vertical hidden, horizontal auto
        maxInlineSize="100%"
        padding="base"
        border="base"
        borderRadius="large"
        accessibilityLabel="Customer testimonials"
      >
        <s-grid
          gap="base"
          gridTemplateRows="1fr"
          gridTemplateColumns={`repeat(${TESTIMONIALS.length}, ${CARD_WIDTH}px)`}
        >
          {TESTIMONIALS.map((t, i) => (
            <s-box key={i} border="base" borderRadius="base" padding="base">
              <s-stack direction="block" gap="base">
                <StarsText rating={t.rating} />
                <s-text type="strong">“{t.quote}”</s-text>
                <s-stack direction="inline" justifyContent="space-between" gap="base">
                  <s-text type="small">{t.name}</s-text>
                  <s-text type="small" color="subdued">{t.detail}</s-text>
                </s-stack>
              </s-stack>
            </s-box>
          ))}
        </s-grid>
      </s-scroll-box>
    </s-stack>
  );
}