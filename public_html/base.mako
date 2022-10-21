<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <title>BCAS: <%block name="title">The Buddhist Community At Stanford</%block></title>
    <meta name="description" content="Web pages for BCAS, the Buddhist Community At Stanford.">
    <meta name="generator"
          content="PyDecanter, a static website generater by Simon Wiles"
          data-generated-at="<%! import datetime %>${datetime.datetime.now().date().isoformat()}">
    <meta name="viewport" content="width=device-width">

    <link rel="preconnect" href="//fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" media="print" onload="this.onload=null;this.removeAttribute('media');" href="https://fonts.googleapis.com/css?family=Oxygen:400,700&amp;subset=latin,latin-ext&display=swap">

    <%block decorator="css">
    <link rel="stylesheet" href="${base_url}/css/normalize.css">
    <link rel="stylesheet" href="${base_url}/css/html5bp_boilerplate.css">
    <link rel="stylesheet" href="${base_url}/css/theming.css">
    <link rel="stylesheet" href="${base_url}/css/responsive_layout.css">
    <link rel="stylesheet" href="${base_url}/css/contact_form.css">
    <link rel="stylesheet" href="${base_url}/css/html5bp_print_styles.css">
    </%block>

  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <script>window.html5 || document.write('<script src="${base_url}/js/html5shiv.js"><\/script>')</script>
    <script src="${base_url}/js/css3-mediaqueries.js"></script>
  <![endif]-->
  </head>
  <body>
  <!--[if lt IE 7]>
    <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
  <![endif]-->

    <div class="header-container">
      <header class="wrapper clearfix">
        <h1 class="title">
          <img alt="dharmacakra" height="45px" width="45px" src="${base_url}/img/dharmacakra_simple_white.svg" onerror="this.onerror=null; this.src='${base_url}/img/dharmacakra_simple_white_45x45.png'"/>
          The Buddhist Community At Stanford
        </h1>
      </header>
      <nav>
        <div class="wrapper">
          <a href="${base_url}/"${' class="current"' if path == base_url + '/index.html' else '' | n}>Home</a>
          <a href="${base_url}/activities.html"${' class="current"' if path == base_url + '/activities.html' else '' | n}>Activities</a>
          <a href="${base_url}/program.html"${' class="current"' if path == base_url + '/program.html' else '' | n}>Program</a>
          <a href="${base_url}/resources.html"${' class="current"' if path == base_url + '/resources.html' else '' | n}>Resources</a>
          <a href="${base_url}/contact.html"${' class="current"' if path == base_url + '/contact.html' else '' | n}>Contact</a>
          <a href="${base_url}/get_involved.html"${' class="current"' if path == base_url + '/get_involved.html' else '' | n}>Get Involved!</a>
        </div>
      </nav>
    </div>

    <div class="main-container">
      <div class="main wrapper clearfix">

        <article>
        <%block name="content" />
        </article>

        <aside>
          <%block name="sidebar" filter="typogrify">
          <p>The Buddhist Community at Stanford is an ecumenical group dedicated to creating a supportive community for Buddhist study and practice.  We welcome experienced Buddhists from different traditions as well as people who are exploring.</p>
          </%block>
        </aside>

        </div> <!-- #main -->
    </div> <!-- #main-container -->
    <div class="footer-container">
      <footer class="wrapper clearfix">
        <a class="footer_logo" href="http://www.stanford.edu"><img src="https://www.stanford.edu/su-identity/images/footer-stanford-logo@2x.png" alt="Stanford University" width="105" height="49"></a>
        <p>
          Website created by <a href="http://simonwiles.net/" title="Simon Wiles">Simon Wiles</a>. | <span class="nb">Last updated: ${ datetime.datetime.now().strftime('%Y-%m-%d') }</span>
          <br>
          See Stanford University’s <a href="http://www.stanford.edu/site/terms.html" title="Stanford Websites Terms of Use" class="nb">Website Terms of Use</a>.
        </p>
      </footer>
    </div>
    <%block name="extra_body" />
  </body>
</html>
