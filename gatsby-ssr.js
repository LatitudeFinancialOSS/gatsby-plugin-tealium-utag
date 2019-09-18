const React = require("react");
const { oneLineTrim } = require("common-tags");

export const onRenderBody = (
  { setHeadComponents, setPreBodyComponents },
  {
    account,
    profile,
    env,
    injectUtagSync = false,
    disableInitialTracking = false
  }
) => {
  if (["dev", "qa", "prod"].includes(env)) {
    if (injectUtagSync) {
      setHeadComponents([
        React.createElement("script", {
          key: "plugin-tealium-utag-sync",
          src: `https://tags.tiqcdn.com/utag/${account}/${profile}/${env}/utag.sync.js`
        })
      ]);
    }

    setPreBodyComponents([
      React.createElement("script", {
        key: "plugin-tealium-utag",
        dangerouslySetInnerHTML: {
          __html: oneLineTrim`
            ${
              disableInitialTracking
                ? `
              window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
              window.utag_cfg_ovrd.noview = true;
            `
                : ""
            }
            (function(a,b,c,d){
              a='//tags.tiqcdn.com/utag/${account}/${profile}/${env}/utag.js';
              b=document;c='script';d=b.createElement(c);
              d.onload=function() { b.dispatchEvent(new Event("utag-loaded")); };
              d.src=a;d.type='text/java'+c;d.async=true;
              a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a)
            })();
          `
        }
      })
    ]);
  } else {
    throw new Error(
      `Unknown env: [${env}]. env must be "dev", "qa", or "prod".`
    );
  }
};
