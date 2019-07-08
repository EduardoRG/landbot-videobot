// system
import React from 'react';
import PropTypes from 'prop-types';
import { Provider as DocumentProvider } from 'context/document';

// lib
import Frame, { FrameContextConsumer } from 'react-frame-component';

// components
import App from 'components/App';

export default class WidgetFrame extends React.Component {
  constructor(props) {
    super(props);

    // References
    this.frameRef = null;
  }

  render() {
    const props = this.props;
    const frameTemplate = `
    <!DOCTYPE html>
    <html>
      <head></head>
      <body>
        <div id="frame-content"></div>
      </body>
    </html>`;

    return (
      <Frame
        initialContent={frameTemplate}
        mountTarget="#frame-content"
        frameBorder="0"
        ref={ref => (this.frameRef = ref)}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <FrameContextConsumer>
          {({ document, window }) => (
            <DocumentProvider
              value={{
                document,
                iframe: this.frameRef.node,
                window,
              }}
            >
              <App config={props.config} />
            </DocumentProvider>
          )}
        </FrameContextConsumer>
      </Frame>
    );
  }
}

WidgetFrame.propTypes = {
  config: PropTypes.object,
};

WidgetFrame.defaultProps = {
  config: {},
};
