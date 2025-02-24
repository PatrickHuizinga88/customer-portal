<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {Accordion, AccordionTrigger} from "~/components/ui/accordion";
import {ChevronRight} from "lucide-vue-next";

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
        title: t('faq.policy_management.view_or_update_policy.title'),
        content: t('faq.policy_management.view_or_update_policy.content')
      },
      {
        value: 'cancel_policy',
        title: t('faq.policy_management.cancel_policy.title'),
        content: t('faq.policy_management.cancel_policy.content')
      },
      {
        value: 'modify_coverage',
        title: t('faq.policy_management.modify_coverage.title'),
        content: t('faq.policy_management.modify_coverage.content')
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
        title: t('faq.claims_and_damage.file_a_claim.title'),
        content: t('faq.claims_and_damage.file_a_claim.content')
      },
      {
        value: 'claim_status',
        title: t('faq.claims_and_damage.claim_status.title'),
        content: t('faq.claims_and_damage.claim_status.content')
      },
      {
        value: 'required_documents',
        title: t('faq.claims_and_damage.required_documents.title'),
        content: t('faq.claims_and_damage.required_documents.content')
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
        value: 'update_personal_data',
        title: t('faq.account_management.update_personal_data.title'),
        content: t('faq.account_management.update_personal_data.content')
      },
      {
        value: 'change_email_or_password',
        title: t('faq.account_management.change_email_or_password.title'),
        content: t('faq.account_management.change_email_or_password.content')
      },
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
      <div v-for="category in faqCategories" class="grid md:grid-cols-3 gap-4 md:gap-12">
        <h2 class="h3 md:mt-2">{{ category.title }}</h2>
        <Accordion type="multiple" class="md:col-span-2">
          <AccordionItem v-for="question in category.questions" :key="question.value" :value="question.value">
            <AccordionTrigger>{{ question.title }}</AccordionTrigger>
            <AccordionContent>{{ question.content }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <NuxtLinkLocale to="contact" class="flex items-center justify-between gap-6 text-lg font-medium bg-muted/50 rounded-xl px-4 sm:px-6 py-4 hover:bg-muted duration-150 mb-6">
        {{ $t('faq.question_missing') }}
        <ChevronRight class="size-5 shrink-0"/>
      </NuxtLinkLocale>
    </div>
  </Page>
</template>

<style scoped>

</style>