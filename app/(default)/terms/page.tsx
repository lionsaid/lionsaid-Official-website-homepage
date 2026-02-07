import type { Metadata } from "next";

import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  const isZh = locale === "zh";
  return {
    title: `${t.legal.terms} - LionSaid`,
    description: isZh ? "LionSaid 平台服务条款" : "Terms of Service for LionSaid platform",
  };
}

function TermsContentEn() {
  return (
    <>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
        <p>
          By accessing or using LionSaid ("the Service"), you agree to be bound by these Terms of Service ("Terms").
          If you do not agree to these Terms, you may not access or use the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">2. Description of Service</h2>
        <p>
          LionSaid provides a platform for users to access various services and features. The Service is provided "as is"
          and "as available" without warranties of any kind, either express or implied.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">3. User Responsibilities</h2>
        <p>You agree to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Provide accurate, current, and complete information during registration</li>
          <li>Maintain the security of your account credentials</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
          <li>Use the Service in compliance with all applicable laws and regulations</li>
          <li>Not engage in any activity that interferes with or disrupts the Service</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">4. Intellectual Property Rights</h2>
        <p>
          All content, features, and functionality of the Service, including but not limited to text, graphics, logos,
          icons, images, audio clips, video clips, data compilations, and software, are the exclusive property of
          LionSaid and are protected by international copyright, trademark, patent, trade secret, and other intellectual
          property laws.
        </p>
        <p className="mt-4">
          You retain ownership of any content you submit to the Service. By submitting content, you grant LionSaid
          a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content
          solely for the purpose of providing the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">5. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, LIONSAID SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY,
          OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Your access to or use of or inability to access or use the Service</li>
          <li>Any conduct or content of any third party on the Service</li>
          <li>Any content obtained from the Service</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>
        <p className="mt-4">
          IN NO EVENT SHALL LIONSAID'S AGGREGATE LIABILITY EXCEED THE AMOUNT YOU PAID TO LIONSAID IN THE TWELVE (12)
          MONTHS PRIOR TO THE EVENT GIVING RISE TO THE LIABILITY.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">6. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless LionSaid, its officers, directors, employees, agents,
          licensors, and suppliers from and against all claims, losses, expenses, damages, and costs, including
          reasonable attorneys&apos; fees, resulting from:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another party</li>
          <li>Your use or misuse of the Service</li>
          <li>Any content you submit to the Service</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">7. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
        </p>
        <p className="mt-4">LIONSAID DOES NOT WARRANT THAT:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>The Service will function uninterrupted, secure, or available at any particular time or location</li>
          <li>Any errors or defects will be corrected</li>
          <li>The Service is free of viruses or other harmful components</li>
          <li>The results of using the Service will meet your requirements</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">8. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the Service at any time, with or without cause,
          with or without notice, effective immediately. Upon termination, your right to use the Service will immediately
          cease.
        </p>
        <p className="mt-4">
          All provisions of these Terms which by their nature should survive termination shall survive, including but
          not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">9. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
          LionSaid operates, without regard to its conflict of law provisions.
        </p>
        <p className="mt-4">
          Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding
          arbitration in accordance with the rules of the applicable arbitration association, except that either
          party may seek injunctive or other equitable relief in any court of competent jurisdiction.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will notify users of any material changes by
          posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Service
          after such modifications constitutes your acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">11. Prohibited Activities</h2>
        <p>You agree not to:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Use the Service for any illegal purpose or in violation of any laws</li>
          <li>Attempt to gain unauthorized access to any portion of the Service</li>
          <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
          <li>Impersonate any person or entity or falsely state or misrepresent your affiliation</li>
          <li>Collect or store personal data about other users without their consent</li>
          <li>Use any automated system to access the Service in a manner that sends more requests than a human can reasonably produce</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">12. Third-Party Services</h2>
        <p>
          The Service may contain links to third-party websites or services that are not owned or controlled by LionSaid.
          We have no control over and assume no responsibility for the content, privacy policies, or practices of any
          third-party websites or services. You acknowledge and agree that LionSaid shall not be responsible or liable
          for any damage or loss caused by your use of any such third-party content, goods, or services.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">13. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p className="mt-4">
          Email: legal@lionsaid.com
          <br />
          Address: [Your Company Address]
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">14. Severability</h2>
        <p>
          If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or
          eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect
          and enforceable.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">15. Entire Agreement</h2>
        <p>
          These Terms constitute the entire agreement between you and LionSaid regarding the use of the Service and
          supersede all prior and contemporaneous written or oral agreements between you and LionSaid.
        </p>
      </section>
    </>
  );
}

function TermsContentZh() {
  return (
    <>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">1. 条款接受</h2>
        <p>
          访问或使用 LionSaid（“服务”）即表示您同意受本《服务条款》（“条款”）约束。
          如您不同意本条款，请勿访问或使用本服务。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">2. 服务说明</h2>
        <p>
          LionSaid 提供一个平台，供用户访问各类服务与功能。本服务按“现状”和“可用”提供，
          不提供任何明示或默示的保证。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">3. 用户责任</h2>
        <p>您同意：</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>在注册时提供真实、准确、最新且完整的信息</li>
          <li>妥善保管您的账户凭证安全</li>
          <li>如发现未经授权使用您的账户，请立即通知我们</li>
          <li>在适用法律法规范围内使用本服务</li>
          <li>不从事干扰或破坏本服务的任何活动</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">4. 知识产权</h2>
        <p>
          服务中的所有内容、功能与特性（包括但不限于文本、图形、标识、图标、图片、音频、视频、
          数据汇编与软件）均为 LionSaid 的专有财产，并受国际版权、商标、专利、商业秘密及其他知识产权法律保护。
        </p>
        <p className="mt-4">
          您保留提交至服务的内容的所有权。提交内容即表示您授予 LionSaid 在全球范围内、非独占、免版税的许可，
          仅用于提供服务所需的使用、复制、修改与分发。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">5. 责任限制</h2>
        <p>
          在法律允许的最大范围内，LIONSAID 不对任何间接、附带、特殊、后果性或惩罚性损害承担责任，
          亦不对任何利润或收入损失（无论直接或间接产生），或数据、使用、商誉或其他无形损失承担责任，
          该等损失源于：
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>您对服务的访问或使用，或无法访问或使用服务</li>
          <li>服务中任何第三方的行为或内容</li>
          <li>从服务获取的任何内容</li>
          <li>对您传输或内容的未经授权访问、使用或更改</li>
        </ul>
        <p className="mt-4">
          在任何情况下，LIONSAID 的累计责任均不超过在事件发生前十二（12）个月内您向 LIONSAID 支付的金额，
          且仅以该等已支付金额为限。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">6. 赔偿</h2>
        <p>
          您同意对因以下原因引起的任何索赔、损失、费用、损害及成本（包括合理律师费）承担赔偿责任，
          并使 LionSaid 及其管理人员、董事、员工、代理人、许可方与供应商免受损害：
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>您违反本条款</li>
          <li>您侵犯任何第三方权利</li>
          <li>您对服务的使用或滥用</li>
          <li>您提交至服务的任何内容</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">7. 免责声明</h2>
        <p>
          本服务按“现状”和“可用”提供，不提供任何明示或默示的保证，包括但不限于适销性、适合特定用途、
          非侵权或履约过程保证。
        </p>
        <p className="mt-4">LIONSAID 不保证：</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>服务在任何特定时间或地点不间断、安全或可用</li>
          <li>任何错误或缺陷将被修复</li>
          <li>服务不含病毒或其他有害组件</li>
          <li>使用服务的结果满足您的需求</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">8. 终止</h2>
        <p>
          我们保留在任何时间、以任何理由或无理由、无需通知即暂停或终止您访问服务的权利，且立即生效。
          终止后，您使用服务的权利立即终止。
        </p>
        <p className="mt-4">
          本条款中因其性质应在终止后继续有效的条款将继续有效，包括但不限于所有权条款、免责声明、赔偿与责任限制。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">9. 适用法律与争议解决</h2>
        <p>
          本条款受 LionSaid 运营所在地法律管辖并按其解释，不考虑其冲突法规定。
        </p>
        <p className="mt-4">
          因本条款或服务引起或与之相关的任何争议应根据适用仲裁机构规则进行仲裁解决，但任何一方均可在有管辖权的法院
          申请禁令或其他衡平救济。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">10. 条款变更</h2>
        <p>
          我们保留随时修改本条款的权利。若有重大变更，我们将通过在本页面发布新条款并更新“最后更新”日期通知用户。
          您在条款修改后继续使用服务即视为接受更新后的条款。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">11. 禁止行为</h2>
        <p>您同意不从事以下行为：</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>将服务用于任何非法目的或违反任何法律</li>
          <li>试图未经授权访问服务的任何部分</li>
          <li>干扰或破坏服务或与服务连接的服务器或网络</li>
          <li>冒充任何个人或实体或虚假陈述或误导您的隶属关系</li>
          <li>未经他人同意收集或存储他人的个人数据</li>
          <li>使用自动化系统以超出合理人类请求频率的方式访问服务</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">12. 第三方服务</h2>
        <p>
          本服务可能包含链接至非 LionSaid 拥有或控制的第三方网站或服务。我们无法控制且不对该等第三方网站或服务
          的内容、隐私政策或做法承担责任。您理解并同意，因使用任何此类第三方内容、商品或服务而产生的损失或损害，
          LionSaid 概不负责。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">13. 联系方式</h2>
        <p>如对本条款有任何疑问，请联系我们：</p>
        <p className="mt-4">
          邮箱：legal@lionsaid.com
          <br />
          地址：[您的公司地址]
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">14. 可分割性</h2>
        <p>
          若本条款的任何条款被认定为不可执行或无效，该条款将被限制或删减至最小必要范围，
          使本条款的其余部分仍然完全有效并可执行。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">15. 完整协议</h2>
        <p>
          本条款构成您与 LionSaid 就服务使用事宜的完整协议，并取代双方此前及同时期所有书面或口头协议。
        </p>
      </section>
    </>
  );
}

export default async function TermsPage() {
  const { locale, t } = await getI18n();
  const isZh = locale === "zh";
  const dateLocale = isZh ? "zh-CN" : "en-US";
  const updated = new Date().toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-20">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.900),theme(colors.indigo.700),theme(colors.gray.800),theme(colors.indigo.600),theme(colors.gray.900))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent dark:bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] md:text-5xl">
              {isZh ? "服务条款" : "Terms of Service"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isZh ? `最后更新：${updated}` : `Last Updated: ${updated}`}
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              {isZh ? <TermsContentZh /> : <TermsContentEn />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
