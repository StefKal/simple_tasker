from django.core import mail


class Mailer:
    base_domain = 'pickvaluedriven.com'
    from_email = 'no-reply@' + base_domain
    templates = {
        'user_activation': {
            'subject': 'valuedriven Account Activation',
            'message': 'Welcome to valuedriven. '
                       'Please follow the link to activate your account',
            'url': 'users/{user_uuid}/activate/{token}',
        },
        'password_recovery': {
            'subject': 'valuedriven Password Reset',
            'message': 'Please follow the link to reset your valuedriven user password',
            'url': 'users/{user_uuid}/reset/{token}',
        },
        # Add new templates

    }

    def send_mail(self, template, recipients, **kwargs):
        subject, message, url_path = self.templates[template].values()
        html_message = message = message.format(**kwargs)
        if url_path:
            url_path = url_path.format(**kwargs)
            url = ''.join(('https://', self.base_domain, '/', url_path))
            html_message = '{0}:<br> <a href={1}>{1}</a>'.format(message, url)
            message = '{0}:\n{1}'.format(message, url)

        params = {
            'subject': subject,
            'message': message,
            'html_message': html_message,
            'from_email': self.from_email,
            'recipient_list': recipients,
            'fail_silently': False,
        }
        messages_sent = mail.send_mail(**params)

        return {
            'messages_sent': messages_sent,
            'messages': [params],
        }

    def send_password_token(self, user, token, domain=None):
        if not user:
            return
        elif user.is_active:
            template = 'password_recovery'
        else:
            template = 'user_activation'

        self.send_mail(template, ["contact@valuedriven.com"],
                       user_uuid=str(user.uuid),
                       token=token,
                       domain=domain)

    def send_company_activation(self, recipients, company):
        if not company:
            return

        self.send_mail('company_activation', recipients,
                       company_id=company.id,
                       company_name=company.name)

    # Add new methods


mailer = Mailer()
