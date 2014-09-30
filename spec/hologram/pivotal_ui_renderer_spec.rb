require 'spec_helper'
require_relative '../../hologram/pivotal_ui_renderer'
require 'haml'

describe PivotalUiRenderer do
  describe '#block_code' do
    def code_example(rendered_code: '', formatted_code: '')
      [
        "<div class=\"codeExample\">",
          "<div class=\"exampleOutput\">",
            "#{rendered_code}",
          "</div>",
          "<div class=\"codeBlock\">",
            "<div class=\"highlight\">",
              "<pre>",
                "#{formatted_code}",
              "</pre>",
            "</div>",
          "</div>",
        "</div>",
      ].join('')
    end

    let(:formatter) { double(:formatter) }
    let(:lexer) { double(:lexer, lex: lexed_code) }
    let(:lexed_code) { double(:lexed_code) }

    before do
      allow(Rouge::Formatters::HTML).to receive(:new) { formatter }
      allow(formatter).to receive(:format).with(lexed_code) { formatted_code }
    end

    subject { PivotalUiRenderer.new.block_code(code, markdown_language) }

    context 'expected language' do
      before do
        allow(Rouge::Lexer).to receive(:find).with(language) { lexer }
      end

      context 'haml' do
        let(:language) { 'haml' }
        let(:code) { '%h1 ' }
        let(:formatted_code) { 'formatted h1' }

        before do
          allow(Haml::Engine).to receive(:new).with('%h1') { double(render: '<h1></h1>') }
        end

        context 'when the language is a haml_example' do
          let(:markdown_language) { 'haml_example' }
          it { is_expected.to eq code_example(
            rendered_code: '<h1></h1>',
            formatted_code: 'formatted h1',
          ) }
        end
      end

      context 'html' do
        let(:language) { 'html' }
        let(:code) { '<h2></h2>' }
        let(:formatted_code) { 'formatted h2' }

        context 'when the language is html_example' do
          let(:markdown_language) { 'html_example' }
          it { is_expected.to eq code_example(
            rendered_code: '<h2></h2>',
            formatted_code: 'formatted h2',
          ) }
        end
      end

      context 'js_example' do
        let(:language) { 'js' }
        let(:markdown_language) { 'js_example' }
        let(:code) { '$(document).ready(function() {});' }
        let(:formatted_code) { 'formatted document.ready' }

        it "inserts the code into the docs so that it will run and make the example work" do
          expect(subject).to include [
            "<script>",
              "$(document).ready(function() {});",
            "</script> ",
          ].join('')
        end

        it { is_expected.to include [
          "<div class=\"codeBlock jsExample\">",
            "<div class=\"highlight\">",
              "<pre>",
                "formatted document.ready",
              "</pre>",
            "</div>",
          "</div>",
        ].join('') }
      end
    end

    context 'unexpected language' do
      let(:markdown_language) { 'fortran' }
      let(:code) { 'goto 12' }
      let(:formatted_code) { 'formatted fortran' }

      before do
        allow(Rouge::Lexer).to receive(:find_fancy).with('guess', code) { lexer }
      end

      it { is_expected.to eq [
        "<div class=\"codeBlock\">",
          "<div class=\"highlight\">",
            "<pre>",
              "formatted fortran",
            "</pre>",
          "</div>",
        "</div>",
      ].join('') }
    end
  end
end
