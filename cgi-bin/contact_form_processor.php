<?php
/* (very) simple contact-form processor by Simon <simonjwiles@gmail.com> */

header('access-control-allow-origin: *');

$MAIL_SUBJECT = "Mail from bcas.stanford.edu [${_POST['name']}]";
$MAIL_FROM = array('bcas@gmail.com', 'BCAS');
$MAIL_RECIPIENTS = array(
    'simonjwiles@gmail.com' => 'Simon @ gmail',
    'sjwiles@stanford.edu' => 'Simon @ Stanford',
);

$RETURN_URL = 'http://bcas.stanford.edu' . $_POST['return_url'];

$message = <<<MESG
A new message has been submitted via bcas.stanford.edu:

From:   ${_POST['name']}
Email:  ${_POST['email']}

Message:
${_POST['message']}

MESG;


require 'class.simple_mail.php';
$mailer = new Simple_Mail();
$mailer->setSubject($MAIL_SUBJECT)
             ->setFrom($MAIL_FROM[0], $MAIL_FROM[1])
             ->addMailHeader('Reply-To', $MAIL_FROM[0], $MAIL_FROM[1])
             //->addMailHeader('Cc', 'bill@example.com', 'Bill Gates')
             //->addMailHeader('Bcc', 'steve@example.com', 'Steve Jobs')
             ->addGenericHeader('X-Mailer', 'PHP/' . phpversion())
             ->addGenericHeader('Content-Type', 'text/plain; charset="utf-8"')
             ->setMessage($message)
             ->setWrap(78);

foreach($MAIL_RECIPIENTS as $addr => $name) {
    $mailer->setTo($addr, $name);
}

$send = $mailer->send();

if ($_POST['ajax']) { die(($send) ? "1" : "0"); }

header('Location: ' . $RETURN_URL . '#' . (($send) ? 'success' : 'failure'), true, 303);
?>
