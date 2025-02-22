<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {Accordion, AccordionTrigger} from "~/components/ui/accordion";

interface FAQCategory {
  title: string;
  questions: FAQQuestion[];
}

interface FAQQuestion {
  value: string;
  title: string;
  content: string;
}

const {t} = useI18n();

const faqCategories: FAQCategory[] = [
  {
    title: t('faq.general.general'),
    questions: [
      {
        value: 'types_of_insurance',
        title: t('faq.general.types_of_insurance.title'),
        content: t('faq.general.types_of_insurance.content')
      },
      {
        value: 'how_to_get_insurance',
        title: t('faq.general.how_to_get_insurance.title'),
        content: t('faq.general.how_to_get_insurance.content')
      }
    ]
  },
  {
    title: t('faq.policy_management.policy_management'),
    questions: [
      {
        value: 'view_or_update_policy',
        title: t('faq.policy_managementview_or_update_policy.title'),
        content: t('faq.policy_managementview_or_update_policy.content')
      },
      {
        value: 'cancel_policy',
        title: t('faq.policy_managementcancel_policy.title'),
        content: t('faq.policy_managementcancel_policy.content')
      },
      {
        value: 'modify_coverage',
        title: t('faq.policy_managementmodify_coverage.title'),
        content: t('faq.policy_managementmodify_coverage.content')
      }
    ]
  },
  {
    title: t('faq.payments_and_premiums.payments_and_premiums'),
    questions: [
      {
        value: 'how_is_premium_calculated',
        title: t('faq.payments_and_premiums.how_is_premium_calculated.title'),
        content: t('faq.payments_and_premiums.how_is_premium_calculated.content')
      },
      {
        value: 'accepted_payment_methods',
        title: t('faq.payments_and_premiums.accepted_payment_methods.title'),
        content: t('faq.payments_and_premiums.accepted_payment_methods.content')
      },
      {
        value: 'missed_payment',
        title: t('faq.payments_and_premiums.missed_payment.title'),
        content: t('faq.payments_and_premiums.missed_payment.content')
      }
    ]
  },
  {
    title: t('faq.claims_and_damage.claims_and_damage'),
    questions: [
      {
        value: 'file_a_claim',
        title: t('faq.claims_and_damagefile_a_claim.title'),
        content: t('faq.claims_and_damagefile_a_claim.content')
      },
      {
        value: 'claim_status',
        title: t('faq.claims_and_damageclaim_status.title'),
        content: t('faq.claims_and_damageclaim_status.content')
      },
      {
        value: 'required_documents',
        title: t('faq.claims_and_damagerequired_documents.title'),
        content: t('faq.claims_and_damagerequired_documents.content')
      }
    ]
  },
  {
    title: t('faq.coverage_and_terms.coverage_and_terms'),
    questions: [
      {
        value: 'what_is_covered',
        title: t('faq.coverage_and_terms.what_is_covered.title'),
        content: t('faq.coverage_and_terms.what_is_covered.content')
      },
      {
        value: 'exclusions_and_limits',
        title: t('faq.coverage_and_terms.exclusions_and_limits.title'),
        content: t('faq.coverage_and_terms.exclusions_and_limits.content')
      },
      {
        value: 'policy_terms',
        title: t('faq.coverage_and_terms.policy_terms.title'),
        content: t('faq.coverage_and_terms.policy_terms.content')
      }
    ]
  },
  {
    title: t('faq.account_management.account_management'),
    questions: [
      {
        value: 'create_account',
        title: t('faq.account_management.create_account.title'),
        content: t('faq.account_management.create_account.content')
      },
      {
        value: 'reset_password',
        title: t('faq.account_management.reset_password.title'),
        content: t('faq.account_management.reset_password.content')
      },
      {
        value: 'update_contact_info',
        title: t('faq.account_management.update_contact_info.title'),
        content: t('faq.account_management.update_contact_info.content')
      }
    ]
  },
  {
    title: t('faq.contact_and_support.contact_and_support'),
    questions: [
      {
        value: 'contact_customer_service',
        title: t('faq.contact_and_support.contact_customer_service.title'),
        content: t('faq.contact_and_support.contact_customer_service.content')
      },
      {
        value: 'business_hours',
        title: t('faq.contact_and_support.business_hours.title'),
        content: t('faq.contact_and_support.business_hours.content')
      },
      {
        value: 'file_a_complaint',
        title: t('faq.contact_and_support.file_a_complaint.title'),
        content: t('faq.contact_and_support.file_a_complaint.content')
      }
    ]
  }
];
</script>

<template>
  <Page :title="$t('faq.header.title')" :description="$t('faq.header.description')">
    <div class="space-y-12">
      <div v-for="category in faqCategories" class="grid grid-cols-3 gap-12">
        <div class="sticky top-0 pt-2">
          <h2 class="h3">{{ category.title }}</h2>
        </div>
        <Accordion type="multiple" class="col-span-2">
          <AccordionItem v-for="question in category.questions" :key="question.value" :value="question.value">
            <AccordionTrigger>{{ question.title }}</AccordionTrigger>
            <AccordionContent>{{ question.content }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </Page>
</template>

<style scoped>

</style>