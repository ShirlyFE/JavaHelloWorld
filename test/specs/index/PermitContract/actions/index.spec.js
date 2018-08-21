import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/PermitContract/actions';

import signatureBase64 from './signatureBase64';

const mockData = {
  "attached_files": [
    {
      "akamai_directory": "",
      "display_name": "9B2BB7AB.PNG",
      "file_size": "29.36kb",
      "file_type": "png",
      "upload_date": "2018 Mar 26 11:07 AM",
      "uploadedfile_id": "C28A0C890E",
    },
  ],
  "charge_summary": {
    "balance": 1002034340,
    "charge_adjustment_for_refund": -9,
    "deposits": 0,
    "deposits_discounts": 0,
    "deposits_taxes": 0,
    "discounts": 0,
    "refunds": 0,
    "rental_fees": 1,
    "taxes": 0,
    "total_payments": 100001,
    "total_permit_fee": 2,
    "total_rental_fees": 1,
  },
  "deposits_info": [
    {
      "amount_paid": 100,
      "balance": 0,
      "charge_amount": 100,
      "charge_amount_no_tax": 100,
      "charge_description": "Claim One-2017 Jun04 Party_3 #950-*lillian_facility",
      "charge_name": "Claim One",
      "event_name": "2017 Jun04 Party_3 #950",
      "receipt_detail_id": 71779,
      "refunds": 0,
      "resource_name": "*lillian_facility",
      "tax": 0,
    },
    {
      "amount_paid": 101,
      "balance": 0,
      "charge_amount": 101,
      "charge_amount_no_tax": 101,
      "charge_description": "Claim One-2017 Jun04 Party_2 #950-*lillian_facility",
      "charge_name": "Claim One",
      "event_name": "2017 Jun04 Party_2 #950",
      "receipt_detail_id": 71778,
      "refunds": 0,
      "resource_name": "*lillian_facility",
      "tax": 0,
    },
    {
      "amount_paid": 100.1,
      "balance": 0,
      "charge_amount": 100.1,
      "charge_amount_no_tax": 100.1,
      "charge_description": "Claim One-2017 Jun04 Party_1 #950-*lillian_facility",
      "charge_name": "Claim One",
      "event_name": "2017 Jun04 Party_1 #950",
      "receipt_detail_id": 71777,
      "refunds": 0,
      "resource_name": "*lillian_facility",
      "tax": 0,
    },
    {
      "amount_paid": 77.01,
      "balance": 30,
      "charge_amount": 77.01,
      "charge_amount_no_tax": 77.01,
      "charge_description": "Charge for intolerable condition",
      "charge_name": "Charge Intolerable",
      "event_name": "Charge Intolerable event",
      "receipt_detail_id": 77621,
      "refunds": 2,
      "resource_name": "resource_which_has_a_long_long_name_but_no_space_to_wrap",
      "tax": 0.1,
    },
  ],
  "events": [
    {
      "booking_count": 2,
      "checklist": {
        "information": [
          {
            "description": "Morgan Waiver 02",
            "signing_status": "Checked",
            "transactionstage_id": 3518,
          },
        ],
        "waivers": [
          {
            "akamai_directory": "http://localhost:8080/jettytest03/",
            "attachment_id": 123,
            "attachment_name": "sample.txt",
            "due_date": "9 Jul 2017",
            "print_payer_and_customer": true,
            "show_signature_line": false,
            "signature_base64": "",
            "signing_status": "Wavier Signed by: Jill Chen on 10 Jul 2017",
            "transactionstage_id": 3520,
            "uploadfile_href_text": null,
            "waiver_for": "Jill Chen",
            "waiver_name": "62118 - Jun.19 15:21",
            "waiver_text": "62118 - Jun.19 15:21",
          },
          {
            "akamai_directory": null,
            "attachment_id": 0,
            "attachment_name": null,
            "due_date": "10 Jul 2017",
            "print_payer_and_customer": false,
            "show_signature_line": true,
            "signature_base64": "",
            "signing_status": "Wavier Signed",
            "transactionstage_id": 3519,
            "uploadfile_href_text": null,
            "waiver_for": "",
            "waiver_name": "Morgan Waiver 01",
            "waiver_text": "Definition of Waiver by ActiveNet123...",
          },
          {
            "akamai_directory": null,
            "attachment_id": 0,
            "attachment_name": null,
            "due_date": "12 Jul 2017",
            "print_payer_and_customer": false,
            "show_signature_line": false,
            "signature_base64": signatureBase64,
            "signing_status": "Wavier Signed",
            "transactionstage_id": 3519,
            "uploadfile_href_text": null,
            "waiver_for": "",
            "waiver_name": "Morgan Waiver 01 - signed",
            "waiver_text": "Definition of Waiver by ActiveNet123... but signed",
          },
          {
            "akamai_directory": null,
            "attachment_id": 0,
            "attachment_name": null,
            "due_date": "12 Jul 2017",
            "print_payer_and_customer": false,
            "show_signature_line": true,
            "signature_base64": signatureBase64,
            "signing_status": "Wavier Signed",
            "transactionstage_id": 3519,
            "uploadfile_href_text": null,
            "waiver_for": "",
            "waiver_name": "Morgan Waiver 01 - signed",
            "waiver_text": "U.S. Legal Forms offers waiver and release forms for many types of activities and events. A waiver and release form is typically used to protect a business or person from liability for dangerous activities by allowing the participant to sign a release before participating. Download our Release of Liability forms in Word format and preview online before you purchase. Waiver of Liability forms are provided for both adults and minors. U.S. Legal Forms offers waiver and release forms for many types of activities and events. A waiver and release form is typically used to protect a business or person from liability for dangerous activities by allowing the participant to sign a release before participating. Download our Release of Liability forms in Word format and preview online before you purchase. Waiver of Liability forms are provided for both adults and minors. U.S. Legal Forms offers waiver and release forms for many types of activities and events. A waiver and release form is typically used to protect a business or person from liability for dangerous activities by allowing the participant to sign a release before participating. Download our Release of Liability forms in Word format and preview online before you purchase. Waiver of Liability forms are provided for both adults and minors.",
          },
        ],
      },
      "customer_notes": "Though I have said this many times already, it seems necessary that I say it every time: I love accuracy in reporting. I care deeply about the truth, and lies and misinformation upset me a great deal. I believe that most of our problems in life can essentially be traced back to false beliefs, and as such, the ideas, stories and lies which create and reinforce false beliefs are the very things which perpetuate the problems we so desperately wish to solve.",
      "event_id": 1,
      "event_name": "2016 Annual Party",
      "questions": [
        {
          "answers": [
            "01: answer_1",
          ],
          "customquestion_id": 1,
          "question": "question_1",
          "sub_questions": [
            {
              "answers": [
                "11: answer_1_sub",
              ],
              "customquestion_id": 2,
              "question": "question_1_sub",
              "sub_questions": [
                {
                  "answers": [
                    "111: answer_1_1_sub1",
                    "112: answer_1_1_sub2",
                    "113: answer_1_1_sub3",
                    "114: answer_1_1_sub4",
                  ],
                  "customquestion_id": 2,
                  "question": "question_1_1_sub?",
                  "sub_questions": [],
                },
              ],
            },
          ],
        },
        {
          "answers": [
            "02: answer_2",
          ],
          "customquestion_id": 2,
          "question": "question_2",
          "sub_questions": [],
        },
      ],
      "resource_count": 1,
      "resources": [
        {
          "additionfee_total": 21.8,
          "addtional_fee_details": [
            {
              "abbrev_unit_of_measure": "ea",
              "amount": 21,
              "charge_name": "One_Time_Charge_Allen_1",
              "facility_charge_id": 0,
              "facility_schedule_id": 0,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false,
              "quantity": 1,
              "receipt_detail_id": 71181,
              "unit_fee": 21,
            },
            {
              "abbrev_unit_of_measure": "ea",
              "amount": 21,
              "charge_name": "One_Time_Charge_Allen_2",
              "facility_charge_id": 0,
              "facility_schedule_id": 0,
              "is_extra_booking_fee": true,
              "is_percentage_discount": false,
              "quantity": 1,
              "receipt_detail_id": 71182,
              "unit_fee": 21,
            },
            {
              "abbrev_unit_of_measure": "ea",
              "amount": -16,
              "charge_name": "One_Time_Discount_Allen",
              "facility_charge_id": 0,
              "facility_schedule_id": 0,
              "is_extra_booking_fee": false,
              "is_percentage_discount": false,
              "quantity": 1,
              "receipt_detail_id": 71183,
              "unit_fee": -16,
            },
            {
              "abbrev_unit_of_measure": "ea",
              "amount": -4.2,
              "charge_name": "Percent_Discount_Allen_Hour",
              "facility_charge_id": 0,
              "facility_schedule_id": 0,
              "is_extra_booking_fee": false,
              "is_percentage_discount": true,
              "quantity": 0,
              "receipt_detail_id": 71184,
              "unit_fee": -10,
            },
          ],
          "bookings": [
            {
              "exception_dates": [
                {
                  "date": "Jul 29, 2017",
                },
                {
                  "end_date": "Jul 31, 2017",
                  "start_date": "Jul 30, 2017",
                },
              ],
              "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
              "group_pattern_description": "Daily, 2 times, from 27 Jul 2017",
              "is_recurring_master": true,
              "recurring_items": [
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 3,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17358,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71179,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Jul 28, 2017",
                      "end_dayofweek": "Fri",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 27, 2017",
                      "start_dayofweek": "Thu",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17358,
                    "master_facility_schedule_id": 0,
                    "schedule_amount": 375,
                  },
                },
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 5,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17359,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71180,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Aug 1, 2017",
                      "end_dayofweek": "Tue",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 31, 2017",
                      "start_dayofweek": "Mon",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17359,
                    "master_facility_schedule_id": 17358,
                    "schedule_amount": 375,
                  },
                },
              ],
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [],
                "facility_schedule": {
                  "end_date": "Aug 1, 2017",
                  "end_dayofweek": "Tue",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 27, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 750,
              },
            },
          ],
          "center_name": "3 center",
          "event_type": "3 event type",
          "event_type_notes": "Though I have said this many times already, it seems necessary that I say it every time: I love accuracy in reporting. I care deeply about the truth, and lies and misinformation upset me a great deal. I believe that most of our problems in life can essentially be traced back to false beliefs, and as such, the ideas, stories and lies which create and reinforce false beliefs are the very things which perpetuate the problems we so desperately wish to solve.",
          "facility_type": 0,
          "resource_name": "Allen_Facility",
        },
      ],
      "total_amount": 771.8,
    },
    {
      "booking_count": 2,
      "checklist": {
        "information": [
          {
            "description": "Morgan Waiver 02",
            "signing_status": "Checked",
            "transactionstage_id": 3518,
          },
        ],
        "waivers": [
          {
            "akamai_directory": "http://localhost:8080/jettytest03/",
            "attachment_id": 123,
            "attachment_name": "sample.txt",
            "due_date": "9 Jul 2017",
            "print_payer_and_customer": true,
            "show_signature_line": false,
            "signature_base64": "",
            "signing_status": "Wavier Signed by: Jill Chen on 10 Jul 2017",
            "transactionstage_id": 3520,
            "uploadfile_href_text": null,
            "waiver_for": "Jill Chen",
            "waiver_name": "62118 - Jun.19 15:21",
            "waiver_text": "62118 - Jun.19 15:21",
          },
          {
            "akamai_directory": null,
            "attachment_id": 0,
            "attachment_name": null,
            "due_date": "10 Jul 2017",
            "print_payer_and_customer": false,
            "show_signature_line": true,
            "signature_base64": "",
            "signing_status": "Wavier Signed",
            "transactionstage_id": 3519,
            "uploadfile_href_text": null,
            "waiver_for": "",
            "waiver_name": "Morgan Waiver 01",
            "waiver_text": "Definition of Waiver by ActiveNet123...",
          },
          {
            "akamai_directory": null,
            "attachment_id": 0,
            "attachment_name": null,
            "due_date": "12 Jul 2017",
            "print_payer_and_customer": false,
            "show_signature_line": false,
            "signature_base64": signatureBase64,
            "signing_status": "Wavier Signed",
            "transactionstage_id": 3519,
            "uploadfile_href_text": null,
            "waiver_for": "",
            "waiver_name": "Morgan Waiver 01 - signed",
            "waiver_text": "Definition of Waiver by ActiveNet123... but signed",
          },
          {
            "akamai_directory": null,
            "attachment_id": 0,
            "attachment_name": null,
            "due_date": "12 Jul 2017",
            "print_payer_and_customer": false,
            "show_signature_line": true,
            "signature_base64": signatureBase64,
            "signing_status": "Wavier Signed",
            "transactionstage_id": 3519,
            "uploadfile_href_text": null,
            "waiver_for": "",
            "waiver_name": "Morgan Waiver 01 - signed",
            "waiver_text": "Definition of Waiver by ActiveNet123... but signed",
          },
        ],
      },
      "event_id": 2,
      "event_name": "2017 Annual Party",
      "questions": [
        {
          "answers": [
            "01: answer_1",
          ],
          "customquestion_id": 1,
          "question": "question_1",
          "sub_questions": [
            {
              "answers": [
                "11: answer_1_sub",
              ],
              "customquestion_id": 2,
              "question": "question_1_sub",
              "sub_questions": [
                {
                  "answers": [
                    "111: answer_1_1_sub1",
                    "112: answer_1_1_sub2",
                    "113: answer_1_1_sub3",
                    "114: answer_1_1_sub4",
                  ],
                  "customquestion_id": 2,
                  "question": "question_1_1_sub?",
                  "sub_questions": [],
                },
              ],
            },
          ],
        },
        {
          "answers": [
            "02: answer_2",
          ],
          "customquestion_id": 2,
          "question": "question_2",
          "sub_questions": [],
        },
      ],
      "resource_count": 1,
      "resources": [
        {
          "additionfee_total": 0,
          "addtional_fee_details": [],
          "bookings": [
            {
              "exception_dates": [
                {
                  "date": "Jul 29, 2017",
                },
                {
                  "end_date": "Jul 31, 2017",
                  "start_date": "Jul 30, 2017",
                },
                {
                  "invalid_exception_date": "test",
                },
              ],
              "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
              "group_pattern_description": "Daily, 2 times, from 27 Jul 2017",
              "is_recurring_master": true,
              "recurring_items": [
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 3,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17358,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71179,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Jul 28, 2017",
                      "end_dayofweek": "Fri",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 27, 2017",
                      "start_dayofweek": "Thu",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17358,
                    "master_facility_schedule_id": 0,
                    "schedule_amount": 375,
                  },
                },
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 5,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17359,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71180,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Aug 1, 2017",
                      "end_dayofweek": "Tue",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 31, 2017",
                      "start_dayofweek": "Mon",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17359,
                    "master_facility_schedule_id": 17358,
                    "schedule_amount": 375,
                  },
                },
              ],
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [],
                "facility_schedule": {
                  "end_date": "Aug 1, 2017",
                  "end_dayofweek": "Tue",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 27, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 750,
              },
            },
            {
              "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
              "group_pattern_description": "Daily, 4 times, from 27 Jul 2017",
              "is_recurring_master": true,
              "recurring_items": [
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 3,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17358,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71179,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Jul 28, 2017",
                      "end_dayofweek": "Fri",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 27, 2017",
                      "start_dayofweek": "Thu",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17358,
                    "master_facility_schedule_id": 0,
                    "schedule_amount": 375,
                  },
                },
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 5,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17359,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71180,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Aug 1, 2017",
                      "end_dayofweek": "Tue",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 31, 2017",
                      "start_dayofweek": "Mon",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17359,
                    "master_facility_schedule_id": 17358,
                    "schedule_amount": 375,
                  },
                },
              ],
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [],
                "facility_schedule": {
                  "end_date": "Aug 1, 2017",
                  "end_dayofweek": "Tue",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 27, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 750,
              },
            },
            {
              "exception_dates": null,
              "group_pattern_context": null,
              "group_pattern_description": null,
              "is_recurring_master": false,
              "recurring_items": null,
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [],
                "facility_schedule": {
                  "end_date": "Jul 29, 2017",
                  "end_dayofweek": "Fri",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 28, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 0,
              },
            },
            {
              "exception_dates": null,
              "group_pattern_context": null,
              "group_pattern_description": null,
              "is_recurring_master": false,
              "recurring_items": null,
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [
                  {
                    "abbrev_unit_of_measure": "/ hr",
                    "amount": 375,
                    "charge_name": "Charge_Per_Hour_Allen",
                    "facility_charge_id": 0,
                    "facility_schedule_id": 17358,
                    "is_extra_booking_fee": false,
                    "is_percentage_discount": false,
                    "quantity": 25,
                    "receipt_detail_id": 71179,
                    "unit_fee": 15,
                  },
                ],
                "facility_schedule": {
                  "end_date": "Jul 29, 2017",
                  "end_dayofweek": "Fri",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 29, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 375,
              },
            },
            {
              "exception_dates": null,
              "group_pattern_context": null,
              "group_pattern_description": null,
              "is_recurring_master": false,
              "recurring_items": null,
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [
                  {
                    "abbrev_unit_of_measure": "/ hr",
                    "amount": 375,
                    "charge_name": "Charge_Per_Hour_Allen",
                    "facility_charge_id": 0,
                    "facility_schedule_id": 17358,
                    "is_extra_booking_fee": false,
                    "is_percentage_discount": false,
                    "quantity": 25,
                    "receipt_detail_id": 71179,
                    "unit_fee": 15,
                  },
                ],
                "facility_schedule": {
                  "end_date": "Jul 29, 2017",
                  "end_dayofweek": "Fri",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 30, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 375,
              },
            },
          ],
          "center_name": "3 center",
          "event_type": "3 event type",
          "facility_type": 0,
          "resource_name": "Allen_Facility",
        },
        {
          "additionfee_total": 0,
          "addtional_fee_details": [],
          "bookings": [
            {
              "exception_dates": [
                {
                  "date": "Jul 29, 2017",
                },
                {
                  "end_date": "Jul 31, 2017",
                  "start_date": "Jul 30, 2017",
                },
                {
                  "invalid_exception_date": "test",
                },
              ],
              "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
              "group_pattern_description": "Daily, 2 times, from 27 Jul 2017",
              "is_recurring_master": true,
              "recurring_items": [
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 3,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17358,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71179,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Jul 28, 2017",
                      "end_dayofweek": "Fri",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 27, 2017",
                      "start_dayofweek": "Thu",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17358,
                    "master_facility_schedule_id": 0,
                    "schedule_amount": 375,
                  },
                },
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 5,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17359,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71180,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Aug 1, 2017",
                      "end_dayofweek": "Tue",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 31, 2017",
                      "start_dayofweek": "Mon",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17359,
                    "master_facility_schedule_id": 17358,
                    "schedule_amount": 375,
                  },
                },
              ],
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [],
                "facility_schedule": {
                  "end_date": "Aug 1, 2017",
                  "end_dayofweek": "Tue",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 27, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 750,
              },
            },
            {
              "group_pattern_context": "{\"count\":4,\"frequency\":2,\"type\":1}",
              "group_pattern_description": "Daily, 4 times, from 27 Jul 2017",
              "is_recurring_master": true,
              "recurring_items": [
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 3,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17358,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71179,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Jul 28, 2017",
                      "end_dayofweek": "Fri",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 27, 2017",
                      "start_dayofweek": "Thu",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17358,
                    "master_facility_schedule_id": 0,
                    "schedule_amount": 375,
                  },
                },
                {
                  "exception_dates": null,
                  "group_pattern_context": null,
                  "group_pattern_description": null,
                  "is_recurring_master": false,
                  "recurring_items": null,
                  "resource_num": 5,
                  "schedule_fee": {
                    "facility_charges": [
                      {
                        "abbrev_unit_of_measure": "/ hr",
                        "amount": 375,
                        "charge_name": "Charge_Per_Hour_Allen",
                        "facility_charge_id": 0,
                        "facility_schedule_id": 17359,
                        "is_extra_booking_fee": false,
                        "is_percentage_discount": false,
                        "quantity": 25,
                        "receipt_detail_id": 71180,
                        "unit_fee": 15,
                      },
                    ],
                    "facility_schedule": {
                      "end_date": "Aug 1, 2017",
                      "end_dayofweek": "Tue",
                      "end_time": "4:15 AM",
                      "start_date": "Jul 31, 2017",
                      "start_dayofweek": "Mon",
                      "start_time": "3:15 AM",
                    },
                    "facility_schedule_id": 17359,
                    "master_facility_schedule_id": 17358,
                    "schedule_amount": 375,
                  },
                },
              ],
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [],
                "facility_schedule": {
                  "end_date": "Aug 1, 2017",
                  "end_dayofweek": "Tue",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 27, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 750,
              },
            },
            {
              "exception_dates": null,
              "group_pattern_context": null,
              "group_pattern_description": null,
              "is_recurring_master": false,
              "recurring_items": null,
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [],
                "facility_schedule": {
                  "end_date": "Jul 29, 2017",
                  "end_dayofweek": "Fri",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 28, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 0,
              },
            },
            {
              "exception_dates": null,
              "group_pattern_context": null,
              "group_pattern_description": null,
              "is_recurring_master": false,
              "recurring_items": null,
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [
                  {
                    "abbrev_unit_of_measure": "/ hr",
                    "amount": 375,
                    "charge_name": "Charge_Per_Hour_Allen",
                    "facility_charge_id": 0,
                    "facility_schedule_id": 17358,
                    "is_extra_booking_fee": false,
                    "is_percentage_discount": false,
                    "quantity": 25,
                    "receipt_detail_id": 71179,
                    "unit_fee": 15,
                  },
                ],
                "facility_schedule": {
                  "end_date": "Jul 29, 2017",
                  "end_dayofweek": "Fri",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 29, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 375,
              },
            },
            {
              "exception_dates": null,
              "group_pattern_context": null,
              "group_pattern_description": null,
              "is_recurring_master": false,
              "recurring_items": null,
              "resource_num": 3,
              "schedule_fee": {
                "facility_charges": [
                  {
                    "abbrev_unit_of_measure": "/ hr",
                    "amount": 375,
                    "charge_name": "Charge_Per_Hour_Allen",
                    "facility_charge_id": 0,
                    "facility_schedule_id": 17358,
                    "is_extra_booking_fee": false,
                    "is_percentage_discount": false,
                    "quantity": 25,
                    "receipt_detail_id": 71179,
                    "unit_fee": 15,
                  },
                ],
                "facility_schedule": {
                  "end_date": "Jul 29, 2017",
                  "end_dayofweek": "Fri",
                  "end_time": "4:15 AM",
                  "start_date": "Jul 30, 2017",
                  "start_dayofweek": "Thu",
                  "start_time": "3:15 AM",
                },
                "facility_schedule_id": 17358,
                "master_facility_schedule_id": 0,
                "schedule_amount": 375,
              },
            },
          ],
          "center_name": "3 center",
          "event_type": "3 event type",
          "facility_type": 0,
          "resource_name": "Allen_Facility",
        },
      ],
      "total_amount": 0,
    },
  ],
  "footer": "test footer:<div><ol><li>list one</li><li>list two</li></ol><div><b>bold content</b></div><div>llfalfals<span style=\"background-color: rgb(255, 0, 0);\"><font color=\"#ffffff\">falsfjalsfjzxv</font></span></div></div>",
  "header": "test header<div>llllaalallala...</div>",
  "org_info": {
    "email_address": "yanbei0391@yahoo.com.cn",
    "fax_number": "(916) 925-0649",
    "phone_number": "(111) 111-1111",
    "site_address": "Ninja Site ~!@#$%^&*()\nTiangu 8th Road ~!@#$%^&* - Line 1\nTiangu 8th Road - Line 2\nXian&, AA\n12345\n",
    "site_logo": "<a href=\" http://localcui.apm.activenet.com/Home\" target=\"_window\"><img class=\"bannerLogo\" src=\"downloadFile.sdi?uploadedfile_id=16\"  alt=\"banner_logo\" border=\"0\" vspace=\"0\" hspace=\"0\"></a>",
    "site_name": "Central Community Center",
  },
  "payment_schedules": {
    "current_balance": 100,
    "original_balance": 100,
    "schedules": [
      {
        "amount": 5,
        "balance": 33.33,
        "due_date": "2017 Aug 2",
        "paid": 0,
        "withdrawn_adjustment": 4,
      },
      {
        "amount": 10,
        "balance": 20,
        "due_date": "2017 Aug 9",
        "paid": 5,
        "withdrawn_adjustment": 10,
      },
      {
        "amount": 33.34,
        "balance": 5,
        "due_date": "2017 Aug 16",
        "paid": 12,
        "withdrawn_adjustment": 25.1,
      },
    ],
  },
  "payments_and_refunds": [
    {
      "applied_amount": 1,
      "charge_amount": 0,
      "charge_name": "3 HOUR fee",
      "event_name": "2017 JUN04 Party#4 #950",
      "receipt_number": 1001210.069,
      "resource_name": "*lillian_facility",
      "transaction_date": "23 Jul 2017",
    },
    {
      "applied_amount": 1,
      "charge_amount": 0,
      "charge_name": "3 HOUR fee",
      "event_name": "2017 Jun04 Party_3 #950",
      "receipt_number": 1001210.069,
      "resource_name": "*lillian_facility",
      "transaction_date": "13 Jul 2017",
    },
    {
      "applied_amount": 100,
      "charge_amount": 0,
      "charge_name": "Claim One",
      "event_name": "2017 Jun04 Party_3 #950",
      "receipt_number": 1001238.069,
      "resource_name": "*lillian_facility",
      "transaction_date": "6 Jul 2017",
    },
    {
      "applied_amount": 20,
      "charge_amount": 0,
      "charge_name": "new charge1",
      "event_name": "ww #950",
      "receipt_number": 1001244.069,
      "resource_name": "Becky new",
      "transaction_date": "10 Jul 2017",
    },
    {
      "applied_amount": 95,
      "charge_amount": 0,
      "charge_name": "Administrative Fee",
      "event_name": "ww #950",
      "receipt_number": 1001244.069,
      "resource_name": "Becky new",
      "transaction_date": "10 Jul, 2016",
    },
    {
      "applied_amount": -18.75,
      "charge_amount": 0,
      "charge_name": "Charge_Per_Hour_Allen",
      "event_name": "ww #950",
      "receipt_number": 1001244.069,
      "resource_name": "",
      "transaction_date": "10 Aug 2017",
    },
  ],
  "permit_info": {
    "booking_number": 0,
    "customer_name": null,
    "event_name": null,
    "event_number": 0,
    "expiration_date": "Jun 11 2017",
    "invoice_total": 100,
    "outstanding_balance": 0,
    "payers": [
      "Seymour212 Skinner212",
      "Seymour212 Skinner212",
      "Seymour212 Skinner212",
    ],
    "permit_end_date": null,
    "permit_id": 2920,
    "permit_number": 9000903,
    "permit_start_date": null,
    "permit_status": "Tentative",
    "reservation_date": "Dec 30, 1899 0:00",
    "site_name": null,
    "status_id": 2,
    "system_user": "Admin Recware Admin Recware Admin Recware",
  },
  "signatures": {
    "company": {
      "company_id": 63,
      "company_name": "3 Company With Agent",
      "company_phone1": "+1US9927330123",
      "company_phone2": "+8613344445555",
      "customer_type": "Ancien/Alumni",
      "mailing_address1": "De",
      "mailing_address2": "Sw",
      "mailing_city": "Portland",
      "mailing_state": "CA",
      "mailing_zipcode": "90005",
    },
    "customer": {
      "cell_phone": "+8613344445555",
      "customer_id": 32436,
      "customer_name": "Company With Agent 1215",
      "email_address": "sw@887.com",
      "home_phone": "+1US4434467656",
      "mailing_address1": "Ef",
      "mailing_address2": "Gy",
      "mailing_city": "Boston",
      "mailing_state": "LA",
      "mailing_zipcode": "77823",
      "work_phone": "+1US9927330123",
    },
    "org": {
      "email_address": "sd@887.com",
      "fax_number": "FX-99721",
      "mailing_address1": "De",
      "mailing_address2": "Sw",
      "mailing_city": "Portland",
      "mailing_state": "CA",
      "mailing_zipcode": "90005",
      "phone_number": "(234) 423-4323",
      "site_logo": "<img src=\"downloadFile.sdi?uploadedfile_id=187\" border=0 alt=\"Site Logo\"/>",
      "site_name": "Signature_Site",
    },
  },
};

const mockSchedule = {
  "permit_schedules": [
    {
      "center_name": "",
      "end_date": "30 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [
        {
          "date": "8 Aug 2017",
        },
      ],
      "occurrences": 9,
      "recurring_indicator": true,
      "resource_name": "zack facility minutes",
      "schedules": [
        {
          "center_name": "*lillian_center1",
          "end_date": "30 Jul 2017",
          "end_day_of_week": "Sun",
          "end_time": "1:30 AM",
          "event_name": "Test Recurring",
          "occurrences": 0,
          "recurring_indicator": false,
          "resource_name": "zack facility minutes",
          "start_date": "30 Jul 2017",
          "start_day_of_week": "Sun",
          "start_time": "1:00 AM",
        },
      ],
      "start_date": "29 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "1:00 AM",
    },
    {
      "center_name": "*lillian_center2",
      "end_date": "17 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [],
      "occurrences": 0,
      "recurring_indicator": false,
      "resource_name": "zack facility minutes",
      "schedules": [],
      "start_date": "8 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "2:00 AM",
    },
    {
      "center_name": "",
      "end_date": "18 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [],
      "occurrences": 0,
      "recurring_indicator": false,
      "resource_name": "zack facility minutes",
      "schedules": [],
      "start_date": "10 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "4:00 AM",
    },
    {
      "center_name": "*lillian_center3",
      "end_date": "20 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [],
      "occurrences": 0,
      "recurring_indicator": false,
      "resource_name": "zack facility minutes",
      "schedules": [],
      "start_date": "20 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "3:00 PM",
    },
    {
      "center_name": "*lillian_center1",
      "end_date": "30 Jul 2017",
      "end_day_of_week": "Sun",
      "end_time": "1:30 AM",
      "event_name": "Test Recurring",
      "exceptions": [
        {
          "date": "8 Aug 2017",
        },
        {
          "date": "9 Aug 2017",
        },
        {
          "date": "10 Aug 2017",
        },
      ],
      "occurrences": 9,
      "recurring_indicator": true,
      "resource_name": "zack facility minutes",
      "schedules": [
        {
          "center_name": "*lillian_center1",
          "end_date": "30 Jul 2017",
          "end_day_of_week": "Sun",
          "end_time": "1:30 AM",
          "event_name": "Test Recurring",
          "occurrences": 0,
          "recurring_indicator": false,
          "resource_name": "zack facility minutes",
          "start_date": "30 Jul 2017",
          "start_day_of_week": "Sun",
          "start_time": "9:00 AM",
        },
        {
          "center_name": "*lillian_center1",
          "end_date": "31 Jul 2017",
          "end_day_of_week": "Mon",
          "end_time": "1:30 AM",
          "event_name": "Test Recurring",
          "occurrences": 0,
          "recurring_indicator": false,
          "resource_name": "zack facility minutes",
          "start_date": "31 Jul 2017",
          "start_day_of_week": "Mon",
          "start_time": "1:00 AM",
        },
        {
          "center_name": "*lillian_center1",
          "end_date": "1 Aug 2017",
          "end_day_of_week": "Tue",
          "end_time": "1:30 AM",
          "event_name": "Test Recurring",
          "occurrences": 0,
          "recurring_indicator": false,
          "resource_name": "zack facility minutes",
          "start_date": "1 Aug 2017",
          "start_day_of_week": "Tue",
          "start_time": "1:00 AM",
        },
      ],
      "start_date": "30 Jul 2017",
      "start_day_of_week": "Sun",
      "start_time": "1:00 AM",
    },
  ],
};

const initialData = {
  permitId: 11112
}

describe('index -> payment -> actions -> PermitContract', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({ initialData });
  });

  afterEach(() => {
    store.clearActions();
  });

  test('fetchPermitContract method should works fine', () => {
    const { fetchPermitContract } = actions;

    return store.dispatch(fetchPermitContract())
      .then(({ payload: { headers, body } }) => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
        expect(body).toEqual(mockData);
    });
  });

  test('fetchPermitSchedule method should works fine', () => {
    const { fetchPermitSchedule } = actions;

    return store.dispatch(fetchPermitSchedule())
      .then(({ payload: { headers, body } }) => {
        const storeActions = store.getActions();

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
        expect(body).toEqual(mockSchedule);
      });
  });

  test('emailContract method should works fine', () => {
    const { emailContract } = actions;

    return store.dispatch(emailContract({
      to: 'recipient@example.com',
      subject: 'Permit #R021233',
      content: 'Here\'s your permit contract'
    })).then(({ payload: { headers } }) => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();

      expect(headers.response_code).toBe('0000');
      expect(headers.response_message).toBe('Successful');
    });
  });

  test('fetchAmendment method should works fine', () => {
    const { fetchAmendment } = actions;

    return store.dispatch(fetchAmendment()).then(({ payload: { headers } }) => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();

      expect(headers.response_code).toBe('0000');
      expect(headers.response_message).toBe('Successful');
    });
  });

  test('savePdfAction method should works fine', () => {
    const { savePdfAction } = actions;

    return store.dispatch(savePdfAction({
      option: 'permit',
      permitNumber: 1,
      containsRecurring: 'permit recurring'
    })).then(({ payload: { headers } }) => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();

      expect(headers.response_code).toBe('0000');
      expect(headers.response_message).toBe('Successful');
    });
  });
});
